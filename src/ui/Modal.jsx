import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";
import {
  useEffect,
  useRef,
  useContext,
  createContext,
  cloneElement,
} from "react";
import { useState } from "react";
/* eslint-disable react/prop-types */

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 5rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 3rem;
  right: 4rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
export const ModalContext = createContext();
// function Modal is the mother of(Modal.Open, Modal.Window) in AddSpace.jsx
// it creates the context
function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => {
    setOpenName("");
  };
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}
// function Open controlls Modal.Open (located in AddSpace)
// it controlls its children with the opens prop.
function OpenForm({ children, opensSpaceForm }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensSpaceForm) });
}

function OpenDelete({ children, opensDeleteSpaceModal }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(opensDeleteSpaceModal),
  });
}

// function Window controlls Modal.Window (located in AddSpace)
// it controlls its children with the name prop.
function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const modalRef = useRef();
  useEffect(() => {
    function handleClickOutside(e) {
      if (!modalRef.current || modalRef.current.contains(e.target)) return;
      close();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
Modal.OpenForm = OpenForm;
Modal.OpenDelete = OpenDelete;
Modal.Window = Window;
export default Modal;

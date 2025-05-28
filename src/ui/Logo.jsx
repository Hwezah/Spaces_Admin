import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  margin: 0 auto;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="src\data\img\logo.jpg" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;

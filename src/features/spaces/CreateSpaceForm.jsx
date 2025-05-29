import styled from "styled-components";
import useCreateSpace from "./useCreateSpace";
import useEditSpace from "./useEditSpace";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
  display: block;
  margin-bottom: 0.8rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateSpaceForm({ spaceToEdit = {}, onCloseModal }) {
  const { isCreating, createSpace } = useCreateSpace();
  const { isEditing, editSpace } = useEditSpace();
  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = spaceToEdit;
  const isEditSession = Boolean(editId);

  // useForm hook to manage form state and validation from react
  // replaces the need to make inputs controlled components and handles
  // the form submission logic
  // { register, handleSubmit, errors, reset } props are provided by the useForm hook
  const { register, handleSubmit, reset } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  // data is comming from the fields that are passed to the form
  // and I'm trying to push it to spaces(at supabase) and then invalidate the query
  // so that the new data is fetched and displayed on the page (queryClient.invalidateQueries)
  // onSubmission is my custom built function to be called by react hook form
  // when the form is submitted
  function onSubmission(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editSpace(
        { newSpaceData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createSpace(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmission)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow>
        <div>
          <Label htmlFor="name">Space name</Label>
          <Input
            type="text"
            id="name"
            {...register("name")}
            disabled={isWorking}
          />
        </div>
        <div>
          <Label htmlFor="maxCapacity">Maximum capacity</Label>
          <Input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity")}
            disabled={isWorking}
          />
        </div>
      </FormRow>

      <FormRow>
        <div>
          <Label htmlFor="regularPrice">Regular price</Label>
          <Input
            type="number"
            id="regularPrice"
            {...register("regularPrice")}
            disabled={isWorking}
          />
        </div>
        <div>
          <Label htmlFor="discount">Discount</Label>
          <Input
            type="number"
            id="discount"
            defaultValue={0}
            {...register("discount")}
            disabled={isWorking}
          />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <Label htmlFor="description">Description for website</Label>
          <Textarea
            type="number"
            id="description"
            defaultValue=""
            {...register("description", { required: "This field is required" })}
            disabled={isWorking}
          />
        </div>

        <div>
          <Label htmlFor="image">Space photo</Label>
          <FileInput
            id="image"
            accept="image/*"
            type="file" // ability to select multiple files from the local file system
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
        </div>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit">
          {isEditSession ? "Edit Space" : "Create Space"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateSpaceForm;

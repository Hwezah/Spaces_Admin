import styled from "styled-components";
import { createSpace } from "../../services/apiSpaces";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
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
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateSpaceForm() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate } = useMutation({
    // mutationFn: (newSpace) => createSpace(newSpace), same thing as bellow
    mutationFn: createSpace,
    // onSuccess is a callback function that will be called when the mutation is successful
    onSuccess: () => {
      // invalidateQueries is a function from react-query to invalidate the cached data of the query
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
      // reset function is called from useForm hook to reset the form fields
      reset();
      // toast is a function from react-toastify to show a success message
      toast.success("Space added successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // useForm hook to manage form state and validation from react
  // replaces the need to make inputs controlled components and handles
  // the form submission logic
  // { register, handleSubmit, errors, reset } props are provided by the useForm hook
  const { register, handleSubmit, errors, reset } = useForm();
  // data is comming from the fields that are passed to the form
  // and I'm trying to push it to spaces(at supabase) and then invalidate the query
  // so that the new data is fetched and displayed on the page (queryClient.invalidateQueries)
  // onSubmission is my custom built function to be called by react hook form
  // when the form is submitted
  function onSubmission(data) {
    mutate(data); // mutate function is called from useMutation hook to mutate the data on the server
  }
  return (
    <Form onSubmit={handleSubmit(onSubmission)}>
      <FormRow>
        <Label htmlFor="name">Space name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Space photo</Label>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating} type="submit">
          Create space
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateSpaceForm;

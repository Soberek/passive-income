import { useFetch } from "../../hooks/useFetch";
import { Contact } from "../../../../shared/types";
import { useForm } from "react-hook-form";

export const useContactTable = () => {
  const { data, error, loading } = useFetch<Contact[]>("http://localhost:3000/api/contacts");

  return { data, error, loading };
};

function temporaryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>();

  const onSubmit = (data: Contact) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName", { required: true })} />
      {errors.firstName && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}

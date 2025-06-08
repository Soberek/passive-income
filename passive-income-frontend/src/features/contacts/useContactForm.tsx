import { useForm } from "react-hook-form";
import { Contact as Contacts } from "../../../../shared/types";
import { useFetch } from "../../hooks/useFetch";

export type ContactFormFields = Omit<Contacts, "contactId">;

export const useContactForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ContactFormFields) => {
    if (!data.firstName || !data.lastName || !data.email) {
      console.error("First name, last name, and email are required.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }
      reset();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return {
    onSubmit,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  };
};

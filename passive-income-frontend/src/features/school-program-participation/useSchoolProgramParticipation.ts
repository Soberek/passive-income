import { useForm } from "react-hook-form";

const useSchoolProgramParticipationForm = ({ refetch }: { refetch: () => void }) => {
  type FormValues = {
    schoolId: number | null;
    programId: number | null;
    schoolYearId: number | null;
    contactId?: number | null;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    // Ensure all fields are selected (not null)
    if (data.schoolId === null || data.programId === null || data.schoolYearId === null || data.contactId === null) {
      console.error("Wszystkie pola muszą być wybrane.");
      return;
    }

    console.log("Dane do wysłania:", data);

    const postData = await fetch("http://localhost:3000/api/school-program-participation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schoolId: data.schoolId,
        programId: data.programId,
        schoolYearId: data.schoolYearId,
        contactId: data.contactId, // Optional field
      }),
    });

    if (!postData.ok) {
      const errorData = await postData.text();
      console.error("Błąd podczas dodawania uczestnictwa:", errorData);
      return;
    }

    const responseData = await postData.text();
    console.log("Uczestnictwo dodane pomyślnie:", responseData);
    refetch(); // Refetch the data to update the table
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useSchoolProgramParticipationForm;

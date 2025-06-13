import { useForm } from "react-hook-form";

const useSchoolProgramParticipationForm = () => {
  type FormValues = {
    school: number | null;
    program: number | null;
    schoolYear: number | null;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    // Ensure all fields are selected (not null)
    if (data.school === null || data.program === null || data.schoolYear === null) {
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
        schoolId: data.school,
        programId: data.program,
        schoolYearId: data.schoolYear,
      }),
    });

    if (!postData.ok) {
      const errorData = await postData.text();
      console.error("Błąd podczas dodawania uczestnictwa:", errorData);
      return;
    }

    const responseData = await postData.text();
    console.log("Uczestnictwo dodane pomyślnie:", responseData);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useSchoolProgramParticipationForm;

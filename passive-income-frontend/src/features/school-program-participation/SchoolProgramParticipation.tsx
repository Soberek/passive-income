import { useForm, Controller } from "react-hook-form";
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import { Institution, Program, SchoolYear } from "../../../../shared/types";

export const SchoolProgramParticipation = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: institutionsData,
    loading: institutionsLoading,
    error: institutionsError,
  } = useFetch<Institution[]>("http://localhost:3000/api/institutions");

  const {
    data: programsData,
    loading: programsLoading,
    error: programsError,
  } = useFetch<Program[]>("http://localhost:3000/api/programs");

  const {
    data: schoolYearsData,
    loading: schoolYearsLoading,
    error: schoolYearsError,
  } = useFetch<SchoolYear[]>("http://localhost:3000/api/school-years");

  const onSubmit = (data: any) => {
    // "data.institution" będzie zawierać tylko institution_id
    const postData = fetch("http://localhost:3000/api/school-program-participation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        institutionId: data.institution,
        programId: data.program,
        schoolYearId: data.schoolYear,
      }),
    });
    postData
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add participation");
        }
        return response.json();
      })
      .then(() => {
        // Reset form or show success message
        console.log("Uczestnictwo dodane pomyślnie");
      })
      .catch((error) => {
        console.error("Błąd podczas dodawania uczestnictwa:", error);
      });
  };
  if (institutionsError) {
    return <Typography color="error">Błąd ładowania szkół: {institutionsError.message}</Typography>;
  }

  if (programsError) {
    return <Typography color="error">Błąd ładowania programów: {programsError.message}</Typography>;
  }

  if (schoolYearsError) {
    return <Typography color="error">Błąd ładowania lat szkolnych: {schoolYearsError.message}</Typography>;
  }

  return (
    <Box sx={{ marginY: 2, marginX: 2 }}>
      <Typography variant="h5" gutterBottom>
        ☎️ Lista kontaktów
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="institution"
          control={control}
          defaultValue={null}
          rules={{ required: "Wybierz szkołę" }}
          render={({ field }) => (
            <Autocomplete
              loading={institutionsLoading}
              options={institutionsData || []}
              getOptionLabel={(option) => `${option.name}, ${option.address}, ${option.postalCode} ${option.city}`}
              onChange={(_, value) => field.onChange(value ? value.institutionId : null)}
              value={institutionsData?.find((i) => i.institutionId === field.value) || null}
              renderInput={(params) => (
                <TextField {...params} label="Wybierz szkołę" placeholder="Wybierz..." error={!!errors.institution} />
              )}
            />
          )}
        />

        <Controller
          name="program"
          control={control}
          defaultValue={null}
          rules={{ required: "Wybierz program" }}
          render={({ field }) => (
            <Autocomplete
              loading={programsLoading}
              options={programsData || []}
              getOptionLabel={(option) => `${option.name}`}
              onChange={(_, value) => field.onChange(value ? value.programId : null)}
              value={programsData?.find((i) => i.programId === field.value) || null}
              renderInput={(params) => (
                <TextField {...params} label="Wybierz program" placeholder="Wybierz..." error={!!errors.program} />
              )}
            />
          )}
        />

        <Controller
          name="schoolYear"
          control={control}
          defaultValue={null}
          rules={{ required: "Wybierz rok szkolny" }}
          render={({ field }) => (
            <Autocomplete
              loading={schoolYearsLoading}
              options={schoolYearsData || []}
              getOptionLabel={(option) => `${option.year}`}
              onChange={(_, value) => field.onChange(value ? value.schoolYearId : null)}
              value={schoolYearsData?.find((i) => i.schoolYearId === field.value) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Wybierz rok szkolny"
                  placeholder="Wybierz..."
                  error={!!errors.schoolYear}
                />
              )}
            />
          )}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Dodaj uczestnictwo
        </Button>
      </form>
    </Box>
  );
};

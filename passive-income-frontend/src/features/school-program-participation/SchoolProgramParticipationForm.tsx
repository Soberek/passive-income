import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import useSchoolProgramParticipation from "./useSchoolProgramParticipation";

const SchoolProgramParticipationForm = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    institutionsData,
    institutionsLoading,
    institutionsError,
    programsData,
    programsLoading,
    programsError,
    schoolYearsData,
    schoolYearsLoading,
    schoolYearsError,
  } = useSchoolProgramParticipation();

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="school"
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
              <TextField {...params} label="Wybierz szkołę" placeholder="Wybierz..." error={!!errors.school} />
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
              <TextField {...params} label="Wybierz rok szkolny" placeholder="Wybierz..." error={!!errors.schoolYear} />
            )}
          />
        )}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Dodaj uczestnictwo
      </Button>
    </form>
  );
};

export default SchoolProgramParticipationForm;

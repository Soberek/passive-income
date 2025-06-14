import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import useSchoolProgramParticipation from "../useSchoolProgramParticipation";
import { Contact, Institution, Program, SchoolYear } from "../../../../../shared/types";

interface SchoolProgramParticipationFormProps {
  institutionsData: Institution[] | null;
  institutionsLoading: boolean;
  institutionsError: Error | null;
  programsData: Program[] | null;
  programsLoading: boolean;
  programsError: Error | null;
  schoolYearsData: SchoolYear[] | null;
  schoolYearsLoading: boolean;
  schoolYearsError: Error | null;
  contactsData: Contact[] | null;
  contactsLoading: boolean;
  contactsError: Error | null;
  refetch: () => void;
}

const SchoolProgramParticipationForm = ({
  institutionsData,
  institutionsLoading,
  institutionsError,
  programsData,
  programsLoading,
  programsError,
  schoolYearsData,
  schoolYearsLoading,
  schoolYearsError,
  contactsData,
  contactsLoading,
  contactsError,
  refetch,
}: SchoolProgramParticipationFormProps) => {
  const { control, handleSubmit, onSubmit, errors } = useSchoolProgramParticipation();

  if (institutionsError) {
    return <Typography color="error">Błąd ładowania szkół: {institutionsError.message}</Typography>;
  }

  if (programsError) {
    return <Typography color="error">Błąd ładowania programów: {programsError.message}</Typography>;
  }

  if (schoolYearsError) {
    return <Typography color="error">Błąd ładowania lat szkolnych: {schoolYearsError.message}</Typography>;
  }

  if (contactsError) {
    return <Typography color="error">Błąd ładowania kontaktów: {contactsError.message}</Typography>;
  }

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await onSubmit(data);
        refetch();
      })}
      style={{ width: "100%" }}
    >
      <Controller
        name="schoolId"
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
              <TextField {...params} label="Wybierz szkołę" placeholder="Wybierz..." error={!!errors.schoolId} />
            )}
          />
        )}
      />

      <Controller
        name="programId"
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
              <TextField {...params} label="Wybierz program" placeholder="Wybierz..." error={!!errors.programId} />
            )}
          />
        )}
      />

      <Controller
        name="schoolYearId"
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
                error={!!errors.schoolYearId}
              />
            )}
          />
        )}
      />

      <Controller
        name="contactId"
        control={control}
        defaultValue={null}
        rules={{ required: "Wybierz kontakt" }}
        render={({ field }) => (
          <Autocomplete
            loading={contactsLoading}
            options={contactsData || []}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            onChange={(_, value) => field.onChange(value ? value.contactId : null)}
            value={contactsData?.find((i) => i.contactId === field.value) || null}
            renderInput={(params) => (
              <TextField {...params} label="Wybierz kontakt" placeholder="Wybierz..." error={!!errors.contactId} />
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

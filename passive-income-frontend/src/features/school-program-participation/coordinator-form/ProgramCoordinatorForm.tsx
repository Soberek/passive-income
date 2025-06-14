import { Autocomplete, Button, TextField } from "@mui/material";
import { Contact, Institution, Program, SchoolYear } from "../../../../../shared/types";
import { Controller, useForm } from "react-hook-form";
import type { FormValues } from "../types";
import { useProgramCoordinatorForm } from "./useProgramCoordinatorForm";

interface ProgramCoordinatorFormProps {
  institutions: Institution[];
  contacts: Contact[];
  programs: Program[];
  schoolYears: SchoolYear[];
}

export const ProgramCoordinatorForm = ({
  institutions,
  contacts,
  programs,
  schoolYears,
}: ProgramCoordinatorFormProps) => {
  const { handleFormSubmit } = useProgramCoordinatorForm();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      institutionId: null,
      contactId: null,
      programId: null,
      schoolYearId: null,
    },
  });

  if (!institutions || institutions.length === 0) {
    console.error("No institutions available");
    return <div>Ładowanie instytucji...</div>;
  }

  if (!programs || programs.length === 0) {
    console.error("No programs available");
    return <div>Ładowanie programów...</div>;
  }

  if (!schoolYears || schoolYears.length === 0) {
    console.error("No school years available");
    return <div>Ładowanie lat szkolnych...</div>;
  }

  if (!contacts || contacts.length === 0) {
    console.error("No contacts available");
    console.log(contacts);
    return <div>Ładowanie kontaktów...</div>;
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: "100%" }}>
      <Controller
        name="institutionId"
        control={control}
        rules={{ required: true }}
        render={({ field, formState }) => (
          <Autocomplete
            options={institutions || []}
            getOptionLabel={(option) => `${option.name}, ${option.address}, ${option.postalCode} ${option.city}`}
            onChange={(_, value) => field.onChange(value ? value.institutionId : null)}
            value={institutions?.find((i) => i.institutionId === field.value) || null}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                error={!!formState.errors.institutionId}
                helperText={formState.errors.institutionId ? "Instytucja jest wymagana" : ""}
                label="Instytucja"
              />
            )}
          />
        )}
      />

      <Controller
        name="contactId"
        control={control}
        rules={{ required: true }}
        render={({ field, formState }) => (
          <Autocomplete
            options={contacts || []}
            getOptionLabel={(option) =>
              option.firstName + " " + option.lastName + (option.email ? ` (${option.email})` : "")
            }
            onChange={(_, value) => field.onChange(value ? value.contactId : null)}
            value={contacts.find((c) => c.contactId === field.value) || null}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Imię i nazwisko kontaktu"
                error={!!formState.errors.contactId}
                helperText={formState.errors.contactId ? "Imię i nazwisko kontaktu jest wymagane" : ""}
              />
            )}
          />
        )}
      />
      <Controller
        name="programId"
        control={control}
        rules={{ required: true }}
        render={({ field, formState }) => (
          <Autocomplete
            options={programs || []}
            getOptionLabel={(option) => option.name}
            onChange={(_, value) => field.onChange(value?.programId || null)}
            value={programs?.find((p) => p.programId === field.value) || null}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                error={!!formState.errors.programId}
                helperText={formState.errors.programId ? "Nazwa programu jest wymagana" : ""}
                label="Nazwa programu"
              />
            )}
          />
        )}
      />
      <Controller
        name="schoolYearId"
        control={control}
        rules={{ required: true }}
        render={({ field, formState }) => (
          <Autocomplete
            options={schoolYears || []}
            getOptionLabel={(option) => option.year}
            onChange={(_, value) => field.onChange(value?.schoolYearId || "")}
            value={schoolYears?.find((sy) => sy.schoolYearId === field.value) || null}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                error={!!formState.errors.schoolYearId}
                helperText={formState.errors.schoolYearId ? "Rok szkolny jest wymagany" : ""}
                label="Rok szkolny"
              />
            )}
          />
        )}
      />

      <Button variant="contained" type="submit">
        Dodaj Koordynatora Programu
      </Button>
    </form>
  );
};

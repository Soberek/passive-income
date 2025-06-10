import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import { Contact, Institution, Program, SchoolYear } from "../../../../shared/types";

type FormValues = {
  institution: number | null;
  contactName: string;
  programName: string;
  schoolYear: string;
};
export const ProgramCoordinator = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      institution: null,
      contactName: "",
      programName: "",
      schoolYear: "",
    },
  });

  const { data: institutions } = useFetch<Institution[]>("http://localhost:3000/api/institutions");
  const { data: contacts } = useFetch<{ contacts: Contact[] }>("http://localhost:3000/api/contacts");
  const { data: programs } = useFetch<Program[]>("http://localhost:3000/api/programs");
  const { data: schoolYears } = useFetch<SchoolYear[]>("http://localhost:3000/api/school-years");

  if (!institutions || !contacts?.contacts || !programs || !schoolYears) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Controller
        name="institution"
        control={control}
        defaultValue={undefined}
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
                error={!!formState.errors.institution}
                helperText={formState.errors.institution ? "Institution is required" : ""}
                label="Institution"
              />
            )}
          />
        )}
      />

      <Controller
        name="contactName"
        control={control}
        rules={{ required: true }}
        render={({ field, formState }) => (
          <Autocomplete
            options={contacts.contacts || []}
            defaultValue={null}
            getOptionLabel={(option) =>
              option.firstName + " " + option.lastName + (option.email ? ` (${option.email})` : "")
            }
            onChange={(_, value) => field.onChange(value ? value.contactId : null)}
            value={contacts.contacts?.find((c) => String(c.contactId) === field.value) || null}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Contact Name"
                error={!!formState.errors.contactName}
                helperText={formState.errors.contactName ? "Contact name is required" : ""}
              />
            )}
          />
        )}
      />
      {/* <Controller
        name="programName"
        control={control}
        rules={{ required: true }}
        render={({ field, formState }) => (
          <Autocomplete
            options={programs || []}
            getOptionLabel={(option) => option}
            onChange={(_, value) => field.onChange(value || "")}
            value={field.value || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                error={!!formState.errors.programName}
                helperText={formState.errors.programName ? "Program name is required" : ""}
                label="Program Name"
              />
            )}
          />
        )}
      /> */}
      {/* <Controller
        name="schoolYear"
        control={control}
        rules={{ required: true }}
        render={({ field, formState }) => (
          <Autocomplete
            options={schoolYears || []}
            getOptionLabel={(option) => option}
            onChange={(_, value) => field.onChange(value || "")}
            value={field.value || ""}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                error={!!formState.errors.schoolYear}
                helperText={formState.errors.schoolYear ? "School year is required" : ""}
                label="School Year"
              />
            )}
          />
        )}
      /> */}

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

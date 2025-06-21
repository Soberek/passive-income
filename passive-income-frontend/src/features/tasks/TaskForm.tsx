import { Autocomplete, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { Institution, Program } from "../../../../shared/types";

// Define Task type locally to match the Zod schema
import { Task } from "../../../../shared/types";
import z from "zod";

const URL = import.meta.env.VITE_API_URL;

const TaskSchema = z.object({
  taskId: z.number(),
  referenceNumber: z.string().min(1, "Reference number is required").optional(),
  taskNumber: z.string().optional(),
  institutionId: z.number().min(1, "Institution ID is required"),
  programId: z.number().min(1, "Program ID is required"),
  actionTypeId: z.number().min(1, "Action Type ID is required"),
  description: z.string().optional(),
  date: z.date(),
  actionsCount: z.number().min(0, "Actions count must be at least 0"),
  audienceCount: z.number().min(0, "Audience count must be at least 0"),
  mediaPlatformId: z.number().optional(),
}) satisfies z.ZodType<Task>;

const TaskSchemaCreate = TaskSchema.omit({
  taskId: true, // Omit taskId for creation
});

// export interface Task {
//     taskId: number;
//     referenceNumber: string;
//     taskNumber?: string;
//     institutionId: number;
//     programId: number;
//     actionTypeId: number;
//     description?: string;
//     date: Date;
//     actionsCount: number;
//     audienceCount: number;
//     mediaPlatformId?: number;
//     createdAt?: Date;
//   }

interface TaskFormI extends Task {
  materials?: string[];
}

export const TaskForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormI>({
    defaultValues: {
      referenceNumber: "",
      taskNumber: "",
      institutionId: 0,
      programId: 0,
      actionTypeId: 0,
      description: "",
      date: new Date(),
      actionsCount: 0,
      audienceCount: 0,
      mediaPlatformId: 0,
    },
  });

  const { data: programs, loading: programsLoading } = useFetch<Program[]>(`${URL}/programs`);
  const { data: institutions, loading: institutionsLoading } = useFetch<Institution[]>(`${URL}/institutions`);
  const { data: actionTypes, loading: actionTypesLoading } = useFetch<{ actionTypeId: number; name: string }[]>(
    `${URL}/action-types`
  );
  const { data: mediaPlatforms, loading: mediaPlatformsLoading } = useFetch<
    { mediaPlatformId: number; name: string }[]
  >(`${URL}/media-platforms`);

  const onSubmit = (data: TaskFormI) => {
    const formatDate = new Date(data.date);
    const dataToSend = { ...data, date: formatDate };
    console.log(dataToSend);

    const validatedData = TaskSchemaCreate.safeParse(dataToSend);
    console.log("Validated Data:", validatedData.error);
  };

  return (
    <>
      {Object.values(errors).length > 0 && <pre>{JSON.stringify(errors, null, 2)}</pre>}
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "600px", paddingBottom: "2rem" }}>
        <Controller
          name="referenceNumber"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error?.message}
              label="Numer referencyjny (OZiPZ.966.5.2.2025)"
              fullWidth
            />
          )}
        />

        <Controller
          name="taskNumber"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error?.message}
              required
              label="Numer zadania (69/2025)"
              fullWidth
            />
          )}
        />

        <Controller
          name="institutionId"
          disabled={true}
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Autocomplete
              options={institutions || []}
              getOptionLabel={(option) => `${option.name}, ${option.address}, ${option.postalCode} ${option.city}`}
              onChange={(_, value) => field.onChange(value ? value.institutionId : null)}
              value={institutions?.find((i) => i.institutionId === field.value) || null}
              disabled={institutionsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={!!formState.errors.institutionId}
                  helperText={formState.errors.institutionId ? "Instytucja jest wymagana" : ""}
                  label={institutionsLoading ? "Ładowanie instytucji..." : "Instytucja"}
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
                  disabled={programsLoading}
                  label={programsLoading ? "Ładowanie programów..." : "Nazwa programu"}
                />
              )}
            />
          )}
        />

        <Controller
          name="actionTypeId"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Autocomplete
              options={actionTypes || []}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => field.onChange(value?.actionTypeId || null)}
              value={actionTypes?.find((p) => p.actionTypeId === field.value) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={!!formState.errors.actionTypeId}
                  helperText={formState.errors.actionTypeId ? "Typ akcji jest wymagany" : ""}
                  disabled={actionTypesLoading}
                  label={actionTypesLoading ? "Ładowanie typów akcji..." : "Typ akcji"}
                />
              )}
            />
          )}
        />

        <Controller
          name="mediaPlatformId"
          control={control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <Autocomplete
              options={mediaPlatforms || []}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => field.onChange(value?.mediaPlatformId || null)}
              value={mediaPlatforms?.find((p) => p.mediaPlatformId === field.value) || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  disabled={mediaPlatformsLoading}
                  error={!!formState.errors.mediaPlatformId}
                  helperText={formState.errors.mediaPlatformId ? "Typ platformy medialnej jest wymagany" : ""}
                  label={mediaPlatformsLoading ? "Ładowanie platform medialnych..." : "Typ platformy medialnej"}
                />
              )}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          defaultValue={new Date()}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error?.message}
              label="Date"
              fullWidth
              // set format
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              required
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          )}
        />

        <Controller
          name="actionsCount"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error?.message}
              label="Actions Count"
              required
              placeholder="Wpisz liczbę działań"
              fullWidth
              type="number"
            />
          )}
        />

        <Controller
          name="audienceCount"
          control={control}
          defaultValue={0}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error?.message}
              label="Audience Count"
              required
              fullWidth
              type="number"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error?.message}
              label="Description"
              required
              fullWidth
              multiline
              rows={4}
            />
          )}
        />

        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "0.5rem" }}>
          Add Task
        </Button>
      </form>
    </>
  );
};

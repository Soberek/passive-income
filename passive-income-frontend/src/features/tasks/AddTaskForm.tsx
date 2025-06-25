import { Alert, Autocomplete, Button, Snackbar, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { Institution, Program } from "../../../../shared/types";

// Define Task type locally to match the Zod schema
import { useState } from "react";

const URL = import.meta.env.VITE_API_URL;

import { TaskSchemaCreate, type TaskCreateType } from "./task.schema";

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

export const AddTaskForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskCreateType>({
    defaultValues: {
      referenceNumber: "",
      taskNumber: "",
      institutionId: undefined,
      programId: undefined,
      actionTypeId: undefined,
      description: "",
      date: new Date().toISOString().split("T")[0], // Set default date to today
      actionsCount: 0,
      audienceCount: 0,
    },
  });

  const { data: programs, loading: programsLoading } = useFetch<Program[]>(`${URL}/programs`);
  const { data: institutions, loading: institutionsLoading } = useFetch<Institution[]>(`${URL}/institutions`);
  const { data: actionTypes, loading: actionTypesLoading } = useFetch<{ actionTypeId: number; name: string }[]>(
    `${URL}/action-types`
  );

  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: TaskCreateType) => {
    const dataToSend = {
      ...data,
      actionsCount: Number(data.actionsCount),
      audienceCount: Number(data.audienceCount),
    };
    const validatedData = TaskSchemaCreate.safeParse(dataToSend);
    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.issues);
      return;
    }

    const post = await fetch(`${URL}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    if (!post.ok) {
      const errorData = await post.json();
      console.error("Failed to create task:", errorData);
      return;
    }

    const response = await post.json();
    setSuccess(true);
    console.log("Task created successfully:", response);
  };

  const handleClose = () => {
    setSuccess(false);
  };

  return (
    <>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          Pomyślnie dodano zadanie!
        </Alert>
      </Snackbar>
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
            <TextField {...field} error={!!fieldState.error?.message} label="Numer zadania (69/2025)" fullWidth />
          )}
        />

        <Controller
          name="institutionId"
          control={control}
          // rules={{ required: true }}
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
              disabled={programsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={!!formState.errors.programId}
                  helperText={formState.errors.programId ? "Nazwa programu jest wymagana" : ""}
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
              disabled={actionTypesLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={!!formState.errors.actionTypeId}
                  helperText={formState.errors.actionTypeId ? "Typ akcji jest wymagany" : ""}
                  label={actionTypesLoading ? "Ładowanie typów akcji..." : "Typ akcji"}
                />
              )}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          defaultValue={new Date().toISOString().split("T")[0]} // Default to today's date
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
              label="Opis zadania"
              fullWidth
              multiline
              rows={4}
            />
          )}
        />

        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "0.5rem" }}>
          Dodaj zadanie
        </Button>
      </form>
    </>
  );
};

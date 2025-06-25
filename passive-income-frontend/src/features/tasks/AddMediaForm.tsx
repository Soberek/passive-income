import { Alert, Autocomplete, Button, Snackbar, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "../../hooks/useFetch";
import { Program } from "../../../../shared/types";

// Define Task type locally to match the Zod schema

import { useState } from "react";

const URL = import.meta.env.VITE_API_URL;

import { TaskPublicationCreateType } from "./task.schema";
import { TaskSchemaPublicationCreate } from "./task.schema";

export const AddMediaForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskPublicationCreateType>({
    defaultValues: {
      taskNumber: "",
      programId: undefined,
      actionTypeId: undefined,
      date: new Date().toISOString().split("T")[0], // Set default date to today
      actionsCount: 1,
      mediaPlatformId: undefined,
    },
  });

  const { data: programs, loading: programsLoading } = useFetch<Program[]>(`${URL}/programs`);
  const { data: actionTypes, loading: actionTypesLoading } = useFetch<{ actionTypeId: number; name: string }[]>(
    `${URL}/action-types`
  );
  const { data: mediaPlatforms, loading: mediaPlatformsLoading } = useFetch<
    { mediaPlatformId: number; name: string }[]
  >(`${URL}/media-platforms`);

  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: TaskPublicationCreateType) => {
    const validatedData = TaskSchemaPublicationCreate.safeParse(data);
    console.log("Validated Data:", validatedData);
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
          name="taskNumber"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField {...field} error={!!fieldState.error?.message} label="Numer zadania (69/2025)" fullWidth />
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
          defaultValue={10}
          render={({ field, formState }) => (
            <Autocomplete
              options={actionTypes || []}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => field.onChange(value?.actionTypeId || null)}
              value={actionTypes?.find((p) => p.actionTypeId === field.value) || null}
              disabled={true}
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
          name="mediaPlatformId"
          control={control}
          defaultValue={4}
          render={({ field, formState }) => (
            <Autocomplete
              options={mediaPlatforms || []}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => field.onChange(value?.mediaPlatformId || null)}
              value={mediaPlatforms?.find((p) => p.mediaPlatformId === field.value) || null}
              disabled={mediaPlatformsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={!!formState.errors.mediaPlatformId}
                  label={mediaPlatformsLoading ? "Ładowanie platform medialnych..." : "Typ platformy medialnej"}
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
          name="description"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={!!fieldState.error?.message}
              label="Opis/Tytuł publikacji"
              fullWidth
              multiline
              rows={4}
            />
          )}
        />

        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: "0.5rem" }}>
          Dodaj publikację
        </Button>
      </form>
    </>
  );
};

import { Button, TextField, Paper, Stack } from "@mui/material";
import { Controller, UseFormHandleSubmit, SubmitHandler } from "react-hook-form";

import { ContactFormFields } from "./useContactForm";

interface ContactFormProps {
  handleSubmit: UseFormHandleSubmit<ContactFormFields, ContactFormFields>;
  control: any;
  reset: () => void;
  formState: { errors: any };
  onSubmit: SubmitHandler<ContactFormFields>;
}
export const ContactForm = ({ handleSubmit, control, reset, formState: { errors }, onSubmit }: ContactFormProps) => {
  return (
    <Paper sx={{ p: 3, mx: "auto", mb: 2, maxWidth: 480 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "Imię jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Imię"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{ required: "Nazwisko jest wymagane" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nazwisko"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Nieprawidłowy email",
              },
            }}
            render={({ field }) => (
              <TextField {...field} label="Email" error={!!errors.email} helperText={errors.email?.message} fullWidth />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              minLength: {
                value: 9,
                message: "Telefon powinien mieć co najmniej 9 znaków",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Telefon"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
              />
            )}
          />

          <Button variant="contained" color="primary" type="submit">
            Dodaj kontakt
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

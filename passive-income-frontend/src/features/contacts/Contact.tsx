import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Contact as Contacts } from "../../../../shared/types";
import ContactsTable from "./ContactTable";
import { Box, Button, TextField, Typography, Paper, Stack } from "@mui/material";

type ContactFormFields = Omit<Contacts, "contactId">;

export const Contact = () => {
  const [contacts, setContacts] = useState<Contacts[]>([]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/contacts");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const onSubmit = async (data: ContactFormFields) => {
    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }
      reset();
      fetchContacts();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <Box sx={{ marginY: 2, marginX: 2 }}>
      <Typography variant="h5" gutterBottom>
        ☎️ Lista kontaktów
      </Typography>

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
                <TextField
                  {...field}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
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

      <ContactsTable
        contacts={contacts}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        totalCount={contacts.length}
      />
    </Box>
  );
};

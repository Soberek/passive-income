import ContactsTable from "./ContactTable";
import { Box, Typography } from "@mui/material";
import { useContactTable } from "./useContactTable";
import { useContactForm } from "./useContactForm";
import { ContactForm } from "./ContactForm";

export const Contact = () => {
  const {
    onSubmit,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useContactForm();

  const { contactList, error, loading } = useContactTable();

  return (
    <Box sx={{ marginY: 2, marginX: 2 }}>
      <Typography variant="h5" gutterBottom>
        ☎️ Lista kontaktów
      </Typography>

      <ContactForm
        handleSubmit={handleSubmit}
        control={control}
        reset={reset}
        formState={{ errors }}
        onSubmit={onSubmit}
      />
      {error && <Typography color="error">Błąd podczas ładowania kontaktów: {error.message}</Typography>}
      {loading && <Typography>Ładowanie kontaktów...</Typography>}
      {!loading && contactList.length === 0 ? (
        <Typography>Brak kontaktów do wyświetlenia.</Typography>
      ) : (
        <ContactsTable contacts={contactList} error={error} loading={loading} />
      )}
    </Box>
  );
};

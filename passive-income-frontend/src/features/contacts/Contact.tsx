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

  const { data, error, loading } = useContactTable();

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
      {!loading && !data && <Typography>Brak kontaktów do wyświetlenia.</Typography>}

      {data && data.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1">Liczba kontaktów: {data.length}</Typography>
          <ContactsTable contacts={data} error={error} loading={loading} />
        </Box>
      )}
    </Box>
  );
};

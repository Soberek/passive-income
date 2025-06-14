import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useRaportDocumentGenerator } from "./useRaportDocumentGenerator";
import { useFetch } from "../../hooks/useFetch";
import { Institution } from "../../../../shared/types";

const IzrzForm = () => {
  const {
    formData,
    setFormData,
    isSubmitting,
    submitMessage,
    handleChange,
    handleFileChange,
    handleSubmit,
    programs,
    programsLoading,
    programsError,
    actionTypes,
    actionTypesLoading,
    actionTypesError,
  } = useRaportDocumentGenerator();

  const { data: institutions, loading: institutionsLoading } = useFetch<Institution[]>(
    "http://localhost:3000/api/institutions",
    {}
  );

  return (
    <Box maxWidth={900} mx="auto">
      <Typography variant="h4" sx={{ mb: 2 }}>
        IZRZ – Generowanie raportu
      </Typography>

      {submitMessage.text && (
        <Paper
          sx={{
            mb: 2,
            p: 2,
            bgcolor: submitMessage.type === "success" ? "#d1fae5" : "#fee2e2",
            color: submitMessage.type === "success" ? "#065f46" : "#991b1b",
          }}
        >
          {submitMessage.text}
        </Paper>
      )}

      <Paper sx={{ p: 3 }}>
        {programsError && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            Błąd podczas ładowania programów: {programsError.message}
          </Typography>
        )}
        {actionTypesError && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            Błąd podczas ładowania rodzajów zadań: {actionTypesError.message}
          </Typography>
        )}

        <Typography variant="body1" sx={{ mb: 2 }}>
          Wypełnij poniższy formularz, aby wygenerować raport IZRZ. Upewnij się, że wszystkie pola są poprawnie
          wypełnione.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Numer sprawy"
                name="caseNumber"
                placeholder="np. OZiPZ.966.1.1.2025"
                value={formData.caseNumber}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Numer raportu"
                name="reportNumber"
                placeholder="np. 45/2025"
                value={formData.reportNumber}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <Autocomplete
                options={programs?.length ? programs.map((program) => (program.name ? program.name : "")) : []}
                loading={programsLoading}
                loadingText="Ładowanie programów..."
                value={formData.programName}
                onChange={(_, value) => setFormData((prev) => ({ ...prev, programName: value || "" }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Program (auto-uzupełnianie)"
                    name="programName"
                    placeholder="Wyszukaj i wybierz program lub wpisz ręcznie"
                    fullWidth
                    required
                  />
                )}
                freeSolo
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <Autocomplete
                options={actionTypes?.length ? actionTypes.map((actionType) => actionType.name) : []}
                loading={actionTypesLoading}
                loadingText="Ładowanie rodzajów zadań..."
                value={formData.taskType}
                onChange={(_, value) => setFormData((prev) => ({ ...prev, taskType: value || "" }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Rodzaj zadania"
                    name="taskType"
                    placeholder="np. Prelekcja"
                    fullWidth
                    required
                  />
                )}
                freeSolo
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <Autocomplete
                options={
                  institutions?.length
                    ? institutions.map(
                        (institution) =>
                          `${institution.name}, ${institution.address}, ${institution.postalCode} ${institution.municipality}`
                      )
                    : []
                }
                loading={institutionsLoading}
                loadingText="Ładowanie placówek..."
                value={formData.address}
                onChange={(_, value) => setFormData((prev) => ({ ...prev, address: value || "" }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Placówka (auto-uzupełnianie)"
                    name="address"
                    placeholder="Wyszukaj i wybierz placówkę lub wpisz ręcznie"
                    fullWidth
                    required
                  />
                )}
                freeSolo
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <TextField
                label="Data"
                type="date"
                name="dateInput"
                value={formData.dateInput}
                onChange={handleChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Liczba widzów"
                type="number"
                name="viewerCount"
                value={formData.viewerCount}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Opis liczby widzów"
                name="viewerCountDescription"
                placeholder="Wprowadź opis liczby widzów"
                value={formData.viewerCountDescription}
                onChange={handleChange}
                required
                multiline
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Opis zadania"
                name="taskDescription"
                placeholder="Wprowadź opis zadania"
                value={formData.taskDescription}
                onChange={handleChange}
                required
                fullWidth
                multiline
                minRows={3}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Dodatkowe informacje"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Wprowadź dodatkowe informacje"
                required
                fullWidth
                multiline
                minRows={2}
              />
            </Grid>

            <Grid size={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.attendanceList}
                    name="attendanceList"
                    color="primary"
                    inputProps={{ "aria-label": "Czy chcesz dodać załacznik listę obecności do raportu?" }}
                    sx={{ mr: 1 }}
                    onChange={(e) => setFormData((prev) => ({ ...prev, attendanceList: e.target.checked }))}
                  />
                }
                label={<Typography variant="body1">Czy chcesz dodać załacznik listę obecności do raportu?</Typography>}
              />
            </Grid>
            <Grid size={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.rozdzielnik}
                    name="rozdzielnik"
                    color="primary"
                    inputProps={{ "aria-label": "Czy chcesz dodać rozdzielnik do raportu?" }}
                    sx={{ mr: 1 }}
                    onChange={(e) => setFormData((prev) => ({ ...prev, rozdzielnik: e.target.checked }))}
                  />
                }
                label={<Typography variant="body1">Czy chcesz dodać rozdzielnik do raportu?</Typography>}
              />
            </Grid>
            <Grid size={12}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label" color={formData.templateFile ? "success" : "primary"}>
                  {formData.templateFile ? "Zmień plik szablonu" : "Wybierz plik szablonu"}
                  <input
                    type="file"
                    name="templateFile"
                    hidden
                    onChange={handleFileChange}
                    required={!formData.templateFile}
                  />
                </Button>
                {formData.templateFile && (
                  <Typography variant="body2" color="text.secondary">
                    {formData.templateFile.name}
                  </Typography>
                )}
              </Stack>
            </Grid>
            <Grid size={12}>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                >
                  {isSubmitting ? "Przetwarzanie..." : "Generuj raport"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default IzrzForm;

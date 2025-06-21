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
  CardContent,
  Divider,
} from "@mui/material";
import { useRaportDocumentGenerator } from "./useRaportDocumentGenerator";
import { useFetch } from "../../hooks/useFetch";
import { Institution } from "../../../../shared/types";
import SitesContainer from "../../components/SiteContainer";
import SiteTitle from "../../components/SiteTitle";

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
    <SitesContainer>
      {/* Header */}
      <SiteTitle>📄 Generowanie raportu IZRZ</SiteTitle>

      {/* Success/Error Messages */}
      {submitMessage.text && (
        <Paper
          elevation={3}
          sx={{
            bgcolor: submitMessage.type === "success" ? "#d1fae5" : "#fee2e2",
            color: submitMessage.type === "success" ? "#065f46" : "#991b1b",
            border: "2px solid",
            borderColor: submitMessage.type === "success" ? "#65d6b5" : "#f87171",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {submitMessage.text}
        </Paper>
      )}

      {/* Main Form */}
      <Paper
        sx={{
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          {/* Error Messages */}
          {(programsError || actionTypesError) && (
            <Box sx={{ mb: 1 }}>
              {programsError && (
                <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                  ⚠️ Błąd podczas ładowania programów: {programsError.message}
                </Typography>
              )}
              {actionTypesError && (
                <Typography color="error" variant="body2">
                  ⚠️ Błąd podczas ładowania rodzajów zadań: {actionTypesError.message}
                </Typography>
              )}
              <Divider sx={{ mt: 2 }} />
            </Box>
          )}

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: "text.secondary",
              fontWeight: 500,
              textAlign: "left",
              fontSize: "1.1rem",
            }}
          >
            Wypełnij poniższy formularz, aby wygenerować raport IZRZ. Upewnij się, że wszystkie pola są poprawnie
            wypełnione.
          </Typography>

          <form onSubmit={handleSubmit} style={{ margin: "0 auto" }}>
            <Grid container spacing={1} sx={{ maxWidth: 600 }}>
              {/* Numer sprawy i raportu */}
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <TextField
                  label="💯 Numer sprawy"
                  name="caseNumber"
                  placeholder="np. OZiPZ.966.1.1.2025"
                  value={formData.caseNumber}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                <TextField
                  label="📄 Numer raportu"
                  name="reportNumber"
                  placeholder="np. 45/2025"
                  value={formData.reportNumber}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              {/* Program */}
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
                      label="📚 Program (auto-uzupełnianie)"
                      name="programName"
                      placeholder="Wyszukaj i wybierz program lub wpisz ręcznie"
                      fullWidth
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#fff",
                          borderRadius: 2,
                        },
                      }}
                    />
                  )}
                  freeSolo
                  fullWidth
                />
              </Grid>

              {/* Rodzaj zadania */}
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
                      label="🎯 Rodzaj zadania"
                      name="taskType"
                      placeholder="np. Prelekcja"
                      fullWidth
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#fff",
                          borderRadius: 2,
                        },
                      }}
                    />
                  )}
                  freeSolo
                  fullWidth
                />
              </Grid>

              {/* Placówka */}
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
                      label="🏫 Placówka (auto-uzupełnianie)"
                      name="address"
                      placeholder="Wyszukaj i wybierz placówkę lub wpisz ręcznie"
                      fullWidth
                      required
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#fff",
                          borderRadius: 2,
                        },
                      }}
                    />
                  )}
                  freeSolo
                  fullWidth
                />
              </Grid>

              {/* Data i liczba widzów */}
              <Grid size={6} sx={{ pr: 1 }}>
                <TextField
                  label="📅 Data"
                  type="date"
                  name="dateInput"
                  value={formData.dateInput}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  label="👥 Liczba widzów"
                  type="number"
                  name="viewerCount"
                  value={formData.viewerCount}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              {/* Opis liczby widzów */}
              <Grid size={12}>
                <TextField
                  label="📝 Opis liczby widzów"
                  name="viewerCountDescription"
                  placeholder="Wprowadź opis liczby widzów"
                  value={formData.viewerCountDescription}
                  onChange={handleChange}
                  required
                  multiline
                  fullWidth
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              {/* Opis zadania */}
              <Grid size={12}>
                <TextField
                  label="📋 Opis zadania"
                  name="taskDescription"
                  placeholder="Wprowadź szczegółowy opis zadania"
                  value={formData.taskDescription}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  minRows={3}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              {/* Dodatkowe informacje */}
              <Grid size={12}>
                <TextField
                  label="ℹ️ Dodatkowe informacje"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Wprowadź dodatkowe informacje"
                  required
                  fullWidth
                  multiline
                  minRows={2}
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              {/* Checkboxy */}
              <Grid
                size={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "flex-start",
                  justifyContent: "flex-start",
                  gap: 2,
                  textAlign: "left",
                }}
              >
                <Paper>
                  <Typography variant="h6" sx={{ mb: 1, color: "primary.main", fontWeight: 600 }}>
                    Załączniki
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.attendanceList}
                        name="attendanceList"
                        color="primary"
                        onChange={(e) => setFormData((prev) => ({ ...prev, attendanceList: e.target.checked }))}
                      />
                    }
                    label={
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        📋 Załącz listę obecności do raportu
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.rozdzielnik}
                        name="rozdzielnik"
                        color="primary"
                        onChange={(e) => setFormData((prev) => ({ ...prev, rozdzielnik: e.target.checked }))}
                      />
                    }
                    label={
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        📄 Dodaj rozdzielnik do raportu
                      </Typography>
                    }
                  />
                </Paper>
              </Grid>

              {/* Upload pliku */}
              <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    width: "100%",
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: "primary.main", fontWeight: 600 }}>
                    Szablon dokumentu
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                    <Button
                      variant="contained"
                      component="label"
                      color={formData.templateFile ? "success" : "primary"}
                      sx={{
                        fontWeight: 600,
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        boxShadow: 2,
                      }}
                    >
                      {formData.templateFile ? "📄 Zmień plik szablonu" : "📤 Wybierz plik szablonu"}
                      <input
                        type="file"
                        name="templateFile"
                        hidden
                        onChange={handleFileChange}
                        required={!formData.templateFile}
                      />
                    </Button>
                  </Stack>
                  {formData.templateFile && (
                    <Typography variant="body1" color="success.main" sx={{ fontWeight: 500 }}>
                      ✅ {formData.templateFile.name}
                    </Typography>
                  )}
                </Paper>
              </Grid>

              {/* Submit Button */}
              <Grid size={12}>
                <Box display="flex" justifyContent="center" mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : "🚀"}
                    sx={{
                      fontWeight: 700,
                      fontSize: 18,
                      px: 8,
                      py: 2,
                      borderRadius: 4,
                      boxShadow: 4,
                      textTransform: "uppercase",
                      background: "linear-gradient(90deg, #1e88e5 0%, #43cea2 100%)",
                      "&:hover": {
                        boxShadow: 6,
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isSubmitting ? "Przetwarzanie..." : "Generuj raport"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Paper>
    </SitesContainer>
  );
};

export default IzrzForm;

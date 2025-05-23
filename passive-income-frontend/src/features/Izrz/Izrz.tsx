import React, { useMemo, useState } from "react";
import { useInstitutions } from "../../hooks/useInstitutions";
import { Box, Button, CircularProgress, Grid, Paper, Stack, TextField, Typography, Autocomplete } from "@mui/material";

interface FormData {
  templateFile: File | null;
  caseNumber: string;
  reportNumber: string;
  programName: string;
  taskType: string;
  address: string;
  dateInput: string;
  viewerCount: number;
  viewerCountDescription: string;
  taskDescription: string;
  additionalInfo: string;
}

const IzrzForm = () => {
  const [formData, setFormData] = useState<FormData>({
    templateFile: null,
    caseNumber: "",
    reportNumber: "",
    programName: "",
    taskType: "",
    address: "",
    dateInput: "",
    viewerCount: 0,
    viewerCountDescription: "",
    taskDescription: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const { institutions, loading: institutionsLoading } = useInstitutions();

  const institutionList = useMemo(() => {
    return institutions.map((institution) => {
      return `${institution.name}, ${institution.address}, ${institution.postalCode} ${institution.city}`;
    });
  }, [institutions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      templateFile: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    const formDataToSend = new FormData(e.currentTarget);

    if (formData.templateFile) {
      formDataToSend.set("templateFile", formData.templateFile);
    }

    try {
      const response = await fetch("http://localhost:3000/api/offline_izrz", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to generate document");
      }

      const fileBlob = await response.blob();

      let filename = "report.docx";
      const disposition = response.headers.get("Content-Disposition");
      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1];
      }

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(fileBlob);
      downloadLink.download = filename;
      downloadLink.click();

      setSubmitMessage({
        type: "success",
        text: "Raport został wygenerowany! Pobieranie rozpoczęte.",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Błąd podczas generowania raportu. Spróbuj ponownie.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <TextField
                label="Nazwa programu"
                name="programName"
                placeholder="np. Higiena naszą tarczą ochronną"
                value={formData.programName}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Rodzaj zadania"
                name="taskType"
                placeholder="np. Prelekcja"
                value={formData.taskType}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            <Grid size={12}>
              <Autocomplete
                options={institutionList}
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
                inputProps={{ min: 0 }}
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

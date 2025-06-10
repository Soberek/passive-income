import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Institution, School } from "../../../../shared/types";

// Import your types (assuming they're in a separate file)

// Define a type for form submission

interface SchoolInstitutionFormProps {
  onSubmit: (
    data: Omit<Institution, "institutionId"> & Omit<School, "schoolId" | "institutionId"> & { isSchool: boolean }
  ) => Promise<void>;
  initialValues?: Partial<
    Omit<Institution, "institutionId"> & Omit<School, "schoolId" | "institutionId"> & { isSchool: boolean }
  >;
}

const SchoolInstitutionForm: React.FC<SchoolInstitutionFormProps> = ({ onSubmit, initialValues = {} }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Institution, "institutionId"> & Omit<School, "schoolId" | "institutionId"> & { isSchool?: boolean }>(
    {
      defaultValues: {
        // Institution fields
        isSchool: false,
        name: initialValues.name || "",
        address: initialValues.address || "",
        postalCode: initialValues.postalCode || "",
        municipality: initialValues.municipality || "",
        city: initialValues.city || "",
        email: initialValues.email || "",
        phone: initialValues.phone || "",

        // School fields
        director: initialValues.director || "",
      },
    }
  );

  const processSubmit = async (
    data: Omit<Institution, "institutionId"> & Omit<School, "schoolId" | "institutionId"> & { isSchool: boolean }
  ) => {
    setIsSubmitting(true);
    setSubmitError(null);

    console.log("Submitting data:", data);

    try {
      await onSubmit(data);
      setSubmitSuccess(true);
      reset(); // Reset the form after successful submission
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dodaj Instytucję i Szkołę
        </Typography>

        <form onSubmit={handleSubmit((data) => processSubmit({ ...data, isSchool: data.isSchool ?? false }))}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" color="primary" gutterBottom>
                Informacje o instytucji
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Wprowadź dane instytucji
              </Typography>

              <Grid container spacing={2}>
                <Grid size={12}>
                  <Controller
                    name="isSchool"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        color="primary"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{ mb: 2 }}
                      />
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Institution name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Institution Name"
                        variant="outlined"
                        fullWidth
                        required
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Address"
                        variant="outlined"
                        fullWidth
                        error={!!errors.address}
                        helperText={errors.address?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="postalCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Postal Code"
                        variant="outlined"
                        fullWidth
                        error={!!errors.postalCode}
                        helperText={errors.postalCode?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="City"
                        variant="outlined"
                        fullWidth
                        error={!!errors.city}
                        helperText={errors.city?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="municipality"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Municipality"
                        variant="outlined"
                        fullWidth
                        error={!!errors.municipality}
                        helperText={errors.municipality?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        type="email"
                      />
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Divider sx={{ my: 3 }} />

          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" color="primary" gutterBottom>
                School Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter the school specific details
              </Typography>

              <Grid container spacing={2}>
                <Grid size={12}>
                  <Controller
                    name="director"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Director"
                        variant="outlined"
                        fullWidth
                        error={!!errors.director}
                        helperText={errors.director?.message}
                      />
                    )}
                  />
                </Grid>

                {/* You can add more school-specific fields here */}
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={() => reset()} disabled={isSubmitting}>
              Reset
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? "Saving..." : "Save School & Institution"}
            </Button>
          </Box>
        </form>

        {/* Success message */}
        <Snackbar
          open={submitSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            School and institution created successfully!
          </Alert>
        </Snackbar>

        {/* Error message */}
        <Snackbar
          open={!!submitError}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {submitError}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default SchoolInstitutionForm;

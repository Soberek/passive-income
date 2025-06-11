import { Box, Typography } from "@mui/material";
import SchoolProgramParticipationForm from "./SchoolProgramParticipationForm";

export const SchoolProgramParticipation = () => {
  return (
    <Box sx={{ marginY: 2, marginX: 2 }}>
      <Typography variant="h5" gutterBottom>
        🎓 Dodaj uczestnictwo szkoły w programie 📚
      </Typography>
      <SchoolProgramParticipationForm />
    </Box>
  );
};

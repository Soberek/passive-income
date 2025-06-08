import React from "react";
import { Box, Typography } from "@mui/material";

interface StatProps {
  label: string;
  value: number;
}

export const Stat: React.FC<StatProps> = ({ label, value }) => (
  <Box
    maxWidth={{ xs: "100%", md: "50%" }} // Adjusts based on screen size
    bgcolor="background.paper" // Optional: can set background color
    borderRadius={2} // Rounded corners
    boxShadow={10} // Optional: add a shadow
    p={2} // Padding
    display="flex"
    flexDirection="column"
  >
    <Typography variant="subtitle1" fontWeight="bold">
      {label}:
    </Typography>
    <Typography variant="h6" fontWeight="bold" textAlign={"right"}>
      {value || 0}
    </Typography>
  </Box>
);

import { createTheme } from "@mui/material/styles";

// colors of this
// primary:  #E16349

const primaryColor = "#E16349"; // Primary color for the theme

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: primaryColor, // Set the AppBar background color
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            backgroundColor: "", // Change background on hover
          },
          alignItems: "center",
          borderRadius: 5,
        },
        contained: {
          backgroundColor: primaryColor, // Primary color for contained buttons
          color: "white",
          "&:hover": {
            backgroundColor: primaryColor, // Darker shade for contained button hover
            color: "white",
          },
        },
      },
    },
    colors: {
      mode: "light",
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: "#9c27b0",
      },
    },
  },
});

export default theme;

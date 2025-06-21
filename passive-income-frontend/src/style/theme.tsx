import { createTheme } from "@mui/material/styles";

// colors of this
// primary:  #E16349
// lighter:  #F29B8A
// darker:   #B94B36
// contrast: #FFFFFF
// accent:   #FF7A59

const primaryColor = "#000"; // Primary color for the theme
const lighterColor = "#F29B8A"; // Lighter shade for the theme
// const darkerColor = "#B94B36"; // Darker shade for the theme
// const contrastColor = "#FFFFFF"; // Contrast color for text and elements
// const accentColor = "#FF7A59"; // Accent color for highlights and buttons

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
    MuiGrid: {
      styleOverrides: {
        root: {
          "&.MuiGrid-root": {
            display: "flex", // Use flexbox for grid layout
            flexWrap: "wrap", // Allow items to wrap
            justifyContent: "space-between", // Space items evenly
            alignItems: "center", // Center items vertically
          },
          "&.MuiGrid-container": {
            defaultProps: {
              spacing: 1,
            },
            padding: "16px", // Add padding to the grid container
            borderRadius: 8, // Rounded corners for the grid container
            spacing: 1,
            direction: "row",
            justifyContent: "center", // Center content in the grid
            alignItems: "center", // Center items vertically
            backgroundColor: "#f5f5f5", // Light background color for the grid
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined", // Default variant for text fields
        margin: "normal", // Normal margin for text fields
        fullWidth: true, // Full width for text fields
        size: "small", // Smaller size for text fields
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 10, // Default elevation for paper components
      },
      styleOverrides: {
        root: {
          // borderRadius: 8, // Rounded corners for paper components
          backgroundColor: "#ffffff", // White background for paper components
          padding: 16,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            fontSize: "1rem", // Smaller font size
          },
          "& .MuiAutocomplete-inputRoot": {},
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
  },
  palette: {
    mode: "light",
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: lighterColor, // Lighter shade for secondary color
    },
    background: {
      default: "#f5f5f5", // Light background color for the app
      paper: "#ffffff", // White background for paper components
    },
    text: {
      primary: "#000", // Darker text color for better readability
      secondary: "#757575", // Secondary text color
      disabled: "#bdbdbd", // Disabled text color
    },
  },
});

export default theme;

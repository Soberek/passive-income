import React from "react";
import { IconType } from "react-icons";
import { Button as MUIButton, ButtonProps } from "@mui/material";

interface ButtonI extends ButtonProps {
  selected?: boolean; // Optional: default to false for simple usage
  label: string | number; // Button label
  onClick?: () => void; // Optional: default no-op function
  Icon?: IconType; // Icon component from react-icons
}

const Button: React.FC<ButtonI> = ({ selected = false, label = "", onClick = () => {}, Icon, ...rest }) => {
  // Conditional styles based on the `selected` state
  const bgColor = selected ? "secondary.main" : "primary.main"; // Use Material-UI colors
  const textColor = selected ? "white" : "white"; // This can be customized further

  return (
    <MUIButton
      variant={selected ? "contained" : "outlined"} // Change variant based on selection
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        boxShadow: "1px 1px 10px ",
        // borderRadius: 5,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          backgroundColor: "secondary.main", // Change background on hover
        },
        display: "flex",
        alignItems: "center",
      }}
      startIcon={Icon ? <Icon size={23} /> : null} // Add icon if provided
      onClick={onClick}
      {...rest} // Pass down any additional MUI Button props
    >
      {label}
    </MUIButton>
  );
};

export default Button;

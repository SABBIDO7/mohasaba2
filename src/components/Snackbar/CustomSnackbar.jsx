import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import the tick icon
import WarningIcon from "@mui/icons-material/Warning"; // Import the warning icon
import ErrorIcon from "@mui/icons-material/Error"; // Import the error icon
import InfoIcon from "@mui/icons-material/Info"; // Import the info icon
const CustomSnackbar = ({ open, onClose, severity, message }) => {
  // Conditionally set the icon based on severity or type
  const getIcon = (severity) => {
    switch (severity) {
      case "success":
        return <CheckCircleIcon fontSize="inherit" />;
      case "warning":
        return <WarningIcon fontSize="inherit" />;
      case "error":
        return <ErrorIcon fontSize="inherit" />;
      case "info":
      default:
        return <InfoIcon fontSize="inherit" />;
    }
  };
  return (
    <Snackbar open={open} autoHideDuration={3500} onClose={onClose}>
      <MuiAlert
        onClose={onClose}
        severity={severity}
        sx={{
          width: "100%",
          fontSize: "1rem",
          padding: "1rem",
          margin: "1rem",
          fontWeight: "bold",
        }}
        icon={getIcon(severity)} // Set the custom icon
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;

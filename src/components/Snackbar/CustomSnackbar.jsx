import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({ open, onClose, severity, message }) => {
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
        style={{ backgroundColor: "red", color: "white" }} // Inline style
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;

import { Snackbar } from "@material-ui/core";
import React from "react";
import { Cryptostate } from "../BlockContext";
import MuiAlert from "@material-ui/lab/Alert";
const Alert = () => {
  const { alert, setAlert } = Cryptostate();
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={4000}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const vertical = "top";
const horizontal = "right";

export default function SnackBar({ notifyOpen, notifyMessage, closeSnackBar }) {
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackBar();
    // setNotify({ open: false, message: "" });
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={notifyOpen}
        message={notifyMessage}
        key={vertical + horizontal}
        autoHideDuration={4000}
        action={action}
        onClose={handleSnackClose}
      />
    </>
  );
}

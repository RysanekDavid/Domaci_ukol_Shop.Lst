import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Tooltip from "@mui/material/Tooltip";

export default function ListControls({
  isOwner,
  isMember,
  handleLeaveList,
  navigateToHome,
}) {
  return (
    <div>
      {!isOwner && isMember && (
        <Button
          onClick={handleLeaveList}
          sx={{
            color: "rgba(80, 2, 99, 1)",
            border: 2,
            borderColor: "#e00914",
            backgroundColor: "rgba(255, 0, 0, 0.75)",
            position: "absolute",

            top: "58vh",
            right: "4vw",
            "&:hover": {
              backgroundColor: "#c00712",
            },
            textTransform: "none",
            fontSize: "1.1rem",
            borderRadius: 4,
            minWidth: "auto",
          }}
        >
          Odejít ze seznamu
        </Button>
      )}

      {!isMember && (
        <p>
          <h2>Opustili jste seznam.</h2>
        </p>
      )}

      <Tooltip title="Všechny Seznamy">
        <IconButton
          onClick={navigateToHome}
          sx={{
            ml: 1,
            mr: 1,
            mb: 1,
            border: 2,
            borderColor: "rgba(80, 2, 99, 1)",
            borderRadius: 5,
            padding: 1,

            backgroundColor: "rgba(80, 2, 99, 0.2)",
            fontSize: {
              xl: "2rem",
              lg: "2rem",
              md: "2rem",
              sm: "1.5rem",
              xs: "1.2rem",
            },
          }}
        >
          <ListAltIcon sx={{ color: "rgba(80, 2, 99, 1)" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}

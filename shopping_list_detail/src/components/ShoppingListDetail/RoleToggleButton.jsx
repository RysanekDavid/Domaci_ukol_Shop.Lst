import React from "react";
import { Button, Typography } from "@mui/material";

const RoleToggleButton = ({ isOwner, toggleRole }) => {
  return (
    <>
      <Button
        variant="contained"
        onClick={toggleRole}
        sx={{
          fontSize: {
            xs: "0.6rem",
          },
          position: "absolute",
          top: 0,
          left: { xs: "65%", md: "55%", lg: "55%", xl: "55%" },
        }}
      >
        {isOwner ? "Změna" : "Změna"}
      </Button>
      {isOwner ? (
        <Typography
          sx={{
            fontSize: "1rem",
            position: "absolute",
            top: 2,
            fontWeight: "bold",
          }}
        >
          Vlastník
        </Typography>
      ) : (
        <Typography
          sx={{
            fontSize: "1rem",
            position: "absolute",
            top: 2,
            fontWeight: "bold",
          }}
        >
          Člen
        </Typography>
      )}
      <Typography
        sx={{
          fontSize: {
            xl: "1.6rem",
            lg: "1.5rem",
            md: "1.5rem",
            sm: "1.4rem",
            xs: "1.1rem",
          },
          position: "absolute",
          top: { xl: 100, lg: 100, md: 90, sm: 110, xs: 125 },
          left: { xl: 66, lg: 24, md: 24, sm: 24, xs: 24 },
          fontWeight: "bold",
        }}
      >
        Koupit:
      </Typography>
    </>
  );
};

export default RoleToggleButton;

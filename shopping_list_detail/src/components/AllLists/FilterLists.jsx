import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function FilterComponent({ setFilter }) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        position: "absolute",
        borderRadius: 6,
        zIndex: 1,
        mt: 3,
        border: 5,
        borderColor: "rgba(80, 2, 99, 1)",

        top: 0,
        pb: 2,
        pt: 2,
        backgroundColor: "black",
      }}
    >
      <Typography
        sx={{
          color: "rgba(199, 180, 209)",
          fontSize: {
            xl: "1.5rem",
            lg: "1.2rem",
            md: "1.4rem",
            sm: "1.5rem",
            xs: "1.2rem",
          },
          justifyContent: "center",
          fontWeight: "bold",
          fontFamily: "Roboto Slab",
          mt: 0.4,
          marginLeft: 4,
        }}
      >
        Filtrovat seznamy:
      </Typography>
      <Button
        variant="contained"
        sx={{
          border: 2,
          borderRadius: 6,
          borderColor: "rgba(80, 2, 99, 1)",
          backgroundColor: "rgba(80, 2, 99, 0.3)",
          color: "white",
          fontSize: {
            xl: "1.1rem",
            lg: "0.8rem",
            md: "0.8rem",
            sm: "0.6rem",
            xs: "0.6rem",
          },
        }}
        onClick={() => setFilter("all")}
      >
        Všechny
      </Button>
      <Button
        variant="contained"
        sx={{
          border: 2,
          borderRadius: 6,
          borderColor: "rgba(80, 2, 99, 1)",
          backgroundColor: "rgba(80, 2, 99, 0.3)",
          color: "white",
          fontSize: {
            xl: "1.1rem",
            lg: "0.8rem",
            md: "0.8rem",
            sm: "0.6rem",
            xs: "0.6rem",
          },
        }}
        onClick={() => setFilter("archived")}
      >
        Archivované
      </Button>
      <Button
        variant="contained"
        sx={{
          border: 2,
          borderRadius: 6,
          borderColor: "rgba(80, 2, 99, 1)",
          backgroundColor: "rgba(80, 2, 99, 0.3)",
          color: "white",
          fontSize: {
            xl: "1.1rem",
            lg: "0.8rem",
            md: "0.8rem",
            sm: "0.6rem",
            xs: "0.6rem",
          },
          mr: 4,
        }}
        onClick={() => setFilter("unarchived")}
      >
        Neachivované
      </Button>
    </Box>
  );
}

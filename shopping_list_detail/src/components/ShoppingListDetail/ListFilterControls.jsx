import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ListFilterControls = ({ setFilter }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: { xl: 12, lg: 28, md: 28, sm: 70, xs: 55 },
        right: { xl: "4vw", lg: "2vw", md: "4vw", sm: "4vw", xs: "1vw" },
        whiteSpace: "nowrap",
      }}
    >
      <Typography
        sx={{
          color: "rgba(80, 2, 99, 1)",
          fontSize: {
            xl: "1.5rem",
            lg: "1.2rem",
            md: "1.4rem",
            sm: "1.5rem",
            xs: "1.2rem",
          },
          fontWeight: "bold",
          marginBottom: 1,
          marginLeft: { xl: 0, lg: 11, md: 4 },

          paddingLeft: { xl: 0, lg: 1, md: 4 },
          display: {
            xl: "flex",
            lg: "flex",
            md: "flex",
            sm: "none",
            xs: "none",
          },
        }}
      >
        {" "}
        Filtrovat:{" "}
      </Typography>
      <Button
        sx={{
          border: 2,
          borderRadius: 6,
          borderColor: "rgba(80, 2, 99, 1)",
          backgroundColor: "rgba(80, 2, 99, 0.3)",
          color: "rgba(80, 2, 99, 1)",
          fontSize: {
            xl: "1.1rem",
            lg: "0.8rem",
            md: "0.6rem",
            sm: "0.6rem",
            xs: "0.6rem",
          },
          mr: 1,
        }}
        onClick={() => setFilter("all")}
      >
        Vše
      </Button>
      <Button
        sx={{
          border: 2,
          borderRadius: 6,
          borderColor: "rgba(80, 2, 99, 1)",
          backgroundColor: "rgba(80, 2, 99, 0.3)",
          color: "rgba(80, 2, 99, 1)",
          fontSize: {
            xl: "1.1rem",
            lg: "0.8rem",
            md: "0.6rem",
            sm: "0.6rem",
            xs: "0.6rem",
          },
          mr: 1,
        }}
        onClick={() => setFilter("done")}
      >
        Hotovo
      </Button>
      <Button
        sx={{
          border: 2,
          borderRadius: 6,
          borderColor: "rgba(80, 2, 99, 1)",
          backgroundColor: "rgba(80, 2, 99, 0.3)",
          color: "rgba(80, 2, 99, 1)",
          fontSize: {
            xl: "1.1rem",
            lg: "0.8rem",
            md: "0.6rem",
            sm: "0.6rem",
            xs: "0.6rem",
          },
          mr: 1,
        }}
        onClick={() => setFilter("undone")}
      >
        Nedokončeno
      </Button>
    </Box>
  );
};

export default ListFilterControls;

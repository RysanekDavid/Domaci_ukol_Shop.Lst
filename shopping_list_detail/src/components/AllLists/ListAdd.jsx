import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

export function AddListForm({ onAddList }) {
  const [newListName, setNewListName] = useState("");

  const handleAddList = () => {
    const newList = {
      name: newListName,
    };

    // Odesíláme požadavek na server
    axios
    .post(`${process.env.REACT_APP_API_URL}/shoppingLists`, newList)
    .then((response) => {
      onAddList(response.data);
      setNewListName("");
    })
    .catch((error) => {
      console.error("Error adding new list:", error);
    });
};

  return (
    <Box
      component="form"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 22,
        right: 22,
        maxWidth: "98%",
        mb: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        backgroundColor: "black",
        borderTop: 5,
        borderLeft: 5,
        borderRight: 5,
        borderColor: "rgba(80, 2, 99, 1)",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000,
        padding: 1, // Přidáno pro vnitřní odsazení
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "rgba(199, 180, 209)",
            fontSize: {
              xl: "1.5rem",
              lg: "1.2rem",
              md: "1.4rem",
              sm: "1.5rem",
              xs: "1.2rem",
            },
            fontWeight: "bold",
            fontFamily: "Roboto Slab",
            ml: 3,
            mb: 1,
            mt: 1,
          }}
        >
          Vytvoření nového seznamu:
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <TextField
          label="Název seznamu"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          sx={{
            mt: 1,
            ml: 2,
            mb: 1,
            flexGrow: 1,
            marginRight: 1,

            ".MuiOutlinedInput-root": {
              borderRadius: 5, // Zaoblení rohů

              "& fieldset": {
                borderColor: "rgba(80, 2, 99, 1)", // Barva ohraničení
              },

              "&:hover fieldset": {
                borderColor: "rgba(80, 2, 99, 1)", // Barva ohraničení při najetí myší
              },

              "&.Mui-focused fieldset": {
                borderColor: "rgba(80, 2, 99, 1)", // Barva ohraničení při fokusu
              },
            },
            ".MuiInputBase-input": {
              color: "white", // Nastavení barvy psaného textu na bílou
            },

            ".MuiInputLabel-root": {
              color: "grey.400", // Nastavení barvy labelu na bílou
            },
          }}
          inputProps={{ maxLength: 18 }}
        />
        <Button
          variant="contained"
          sx={{
            border: 3,
            borderColor: "rgba(80, 2, 99, 1)",
            borderRadius: 5,
            mr: 2,
            ml: 2,
            color: "white",
            backgroundColor: "rgba(80, 2, 99, 0.25)",
            "&.Mui-disabled": {
              color: "grey", // Barva textu pro disabled tlačítko
              backgroundColor: "rgba(80, 2, 99, 0.25)", // Barva pozadí pro disabled tlačítko
              borderColor: "rgba(80, 2, 99, 0.7)", // Barva ohraničení pro disabled tlačítko
            },
          }}
          onClick={handleAddList}
          disabled={!newListName}
        >
          Přidat seznam
        </Button>
      </Box>
    </Box>
  );
}

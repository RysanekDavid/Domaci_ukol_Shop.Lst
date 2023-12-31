// AddItemForm.jsx
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";

export default function AddItemForm({
  inputValue,
  setInputValue,
  listId,
  setItems,
}) {
  const addItem = async () => {
    // Přejmenováno na addItem
    if (inputValue) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/shoppingLists/${listId}/items`,
          {
            name: inputValue,
            quantity: 1, // Výchozí hdonota
          }
        );
        setItems(response.data.items); // Aktualizace stavu - ujistěte se, že setItems je předáno jako prop
        setInputValue("");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        bottom: {
          xl: "22vh",
          lg: "26vh",
          md: "26vh",
          sm: "21vh",
          xs: "24vh",
        },
      }}
    >
      <TextField
        label="Přidat položku"
        value={inputValue}
        variant="outlined"
        size="small"
        sx={{
          ml: 2,
          mr: 1,

          minWidth: {
            xs: "44vw",
            sm: "10rem",
            md: "10rem",
            lg: "15rem",
            xl: "20rem",
          },
          "& .MuiOutlinedInput-root": {
            color: "rgba(80, 2, 99,0.8)", // Barva textu
            "& fieldset": {
              borderColor: "rgba(80, 2, 99, 0.8)",
              border: 2,
              borderRadius: 4, // Barva okraje
            },
            "&:hover fieldset": {
              borderColor: "rgba(80, 2, 99, 1)", // Barva okraje při najetí myší
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(80, 2, 99, 1)", // Barva okraje při zaměření
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(80, 2, 99,0.8)", // Barva popisku
          },
        }}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={addItem}
        size="medium"
        sx={{
          minWidth: "4rem",
          mr: 1,
          border: 2,
          color: "white",
          fontWeight: "bold",
          borderColor: "rgba(80, 2, 99, 0.8)",
          borderRadius: 4,
          backgroundColor: "rgba(80, 2, 99, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(80, 2, 99, 0.6)",
            border: 2,
            borderColor: "rgba(80, 2, 99, 0.6)",
            color: "rgba(80, 2, 99,1)",
          },
        }}
      >
        Přidat
      </Button>
    </Box>
  );
}
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ListDetailComponent() {
  // Zde můžete definovat stav a funkce

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 1,
        boxShadow: 3,
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        minWidth: "60vw",
        maxWidth: "80vw",
        minHeight: "60vh",
        maxHeight: "80vh",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Nákupní Seznam
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {/* Položky seznamu by šly sem */}
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          }
        >
          {/* Zde bude název položky */}
        </ListItem>
        {/* Další položky */}
      </List>
      <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
        <TextField label="Přidat položku" sx={{ mr: 1 }} />
        <Button variant="contained" color="primary">
          Přidat
        </Button>
      </Box>
    </Box>
  );
}

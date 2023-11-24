import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArchiveIcon from "@mui/icons-material/Archive";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const initialLists = [
  { id: 1, name: "Osobní nákupy" },
  { id: 2, name: "Práce" },
  { id: 3, name: "Večírek" },
  { id: 4, name: "TEST - Vlastník" },
  { id: 5, name: "TEST - Member" },
  // max char:16
];

export default function ShoppingListsOverview() {
  const [lists, setLists] = useState(initialLists);
  const [newListName, setNewListName] = useState("");

  const handleDelete = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Edit list:");
  };

  const handleAddList = () => {
    const newList = {
      id: Math.random(),
      name: newListName,
      archieved: false,
      userId: Math.random(),
      role: "owner",
      members: [],
    };
    setLists([...lists, newList]);
    setNewListName("");
    console.log(newList);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4, // můžete upravit podle vašich potřeb
        justifyContent: "center",
        p: 2,
        border: 1, //ind
        borderColor: "red", //ind to delete both
      }}
    >
      <Box
        component="form"
        sx={{ width: "100%", mb: 2, border: 1, borderColor: "grey.900" }}
      >
        <TextField
          fullWidth
          label="Název nového seznamu"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          inputProps={{ maxLength: 18 }}
        />
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={handleAddList}
          disabled={!newListName}
        >
          Přidat seznam
        </Button>
      </Box>
      {lists.map((list) => (
        <Card
          key={list.id}
          sx={{
            minWidth: 275,
            backgroundColor: "rgba(80, 2, 99, 0.1)",
            border: 3,
            borderRadius: 3,
            borderColor: "rgba(80, 2, 99, 1)",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 32,
                color: "rgba(80, 2, 99, 1)",
                border: 3,
                borderRadius: 3,
                textAlign: "center",
                minWidth: 245,
              }}
              variant="h5"
              color="text.secondary"
              gutterBottom
            >
              {list.name}
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: 6,
                minWidth: "85%",
                mt: 2,
                color: "rgba(39, 5, 125, 1)",
                border: 4,
                fontWeight: "bold",
                fontSize: 15,

                backgroundColor: "rgba(80, 2, 99, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(80, 2, 99, 0.3)",
                },
              }}
            >
              Otevřít Seznam
            </Button>
          </CardContent>
          <CardActions>
            <IconButton
              aria-label="edit"
              onClick={() => handleEdit(list.id)}
              sx={{
                ml: 1,
                mb: 1,
                mr: 1,
                border: 2,
                borderColor: "rgba(80, 2, 99, 1)",
                borderRadius: 5,
                backgroundColor: "rgba(80, 2, 99, 0.05)",
              }}
            >
              <EditIcon
                sx={{
                  color: "rgba(80, 2, 99, 1)",
                  fontSize: {
                    xs: "160%",
                    sm: "120%",
                    md: "120%",
                    lg: "120%",
                    xl: "120%",
                  },
                }}
              />
            </IconButton>
            <IconButton
              aria-label="archive"
              onClick={() => console.log("Archive list:", list.id)}
              sx={{
                ml: 1,
                mb: 1,
                mr: 1,
                border: 2,
                borderColor: "rgba(80, 2, 99, 1)",
                borderRadius: 5,
                backgroundColor: "rgba(80, 2, 99, 0.05)",
              }}
            >
              <ArchiveIcon
                sx={{
                  color: "rgba(80, 2, 99, 1)",
                  fontSize: {
                    xs: "160%",
                    sm: "120%",
                    md: "120%",
                    lg: "120%",
                    xl: "120%",
                  },
                }}
              />
            </IconButton>
            <IconButton
              aria-label="add person"
              onClick={() => console.log("Invite to list:", list.id)}
              sx={{
                ml: 1,
                mb: 1,
                mr: 1,
                border: 2,
                borderColor: "rgba(3, 130, 3, 1)",
                borderRadius: 5,
                backgroundColor: "rgba(80, 2, 99, 0.05)",
              }}
            >
              <PersonAddIcon
                sx={{
                  color: "rgba(3, 130, 3, 1)",
                  fontSize: {
                    xs: "160%",
                    sm: "120%",
                    md: "120%",
                    lg: "120%",
                    xl: "120%",
                  },
                }}
              />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(list.id)}
              sx={{
                ml: 1,
                mb: 1,
                mr: 1,
                border: 2,
                borderColor: "rgba(255, 2, 9, 1)",
                borderRadius: 5,
                backgroundColor: "rgba(80, 2, 99, 0.05)",
              }}
            >
              <DeleteForeverIcon
                sx={{
                  color: "rgba(255, 0, 0, 0.9)",
                  fontSize: {
                    xs: "160%",
                    sm: "120%",
                    md: "120%",
                    lg: "120%",
                    xl: "120%",
                  },
                }}
              />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

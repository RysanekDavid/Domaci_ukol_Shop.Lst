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
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { FilterComponent } from "../AllLists/FilterLists";

const initialLists = [
  { id: 1, name: "Osobní nákupy" },
  { id: 2, name: "Práce" },
  { id: 3, name: "Večírek" },
  { id: 4, name: "TEST - Vlastník" },
  { id: 5, name: "TEST - Member" },
];

export default function ShoppingListsOverview() {
  const [lists, setLists] = useState(initialLists);
  const [newListName, setNewListName] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Edit list:");
  };

  const handleAddList = () => {
    const newList = {
      id: nanoid(10),
      name: newListName,
      archieved: false,
      userId: nanoid(6), //todo bude se přebírat z backendu
      role: "owner",
      members: [],
    };
    setLists([...lists, newList]);
    setNewListName("");
    console.log(newList);
  };

  const handleOpenList = (id) => {
    navigate(`/detail/${id}`); // Navigace na stránku detailu s ID seznamu
  };

  const filteredLists = lists.filter((list) => {
    if (filter === "archived") return list.archieved;
    if (filter === "unarchived") return !list.archieved;
    return true;
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
        mt: 16,
        ml: 2,
        mr: 2,
      }}
    >
      <FilterComponent setFilter={setFilter} />
      {filteredLists.map((list) => (
        <Card
          key={list.id}
          sx={{
            minWidth: 280,
            backgroundColor: "rgba(80, 2, 99, 0.05)",
            border: 1,
            borderRadius: 6,
            overflow: "hidden",
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
                borderRadius: 6,
                textAlign: "center",
                minWidth: 245,
                fontFamily: "Roboto Slab",
              }}
              variant="h2"
              color="text.secondary"
              gutterBottom
            >
              {list.name}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleOpenList(list.id)}
              sx={{
                borderRadius: 4,
                minWidth: "0%",
                mt: 1,
                mb: -1,
                color: "rgba(2, 82, 3, 1)",
                border: 4,
                fontWeight: "bold",
                fontSize: 13,

                backgroundColor: "rgba(2, 160, 3, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(2, 140, 3, 0.3)",
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
            justifyContent: "flex-start", // Zarovnání textu vlevo
            // Přidání paddingu na levé straně pro odsazení textu
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
                // Selektor pro vnitřní input element
                color: "white", // Nastavení barvy psaného textu na bílou
              },

              ".MuiInputLabel-root": {
                // Selektor pro label
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
              mt: 1,
              mr: 2,
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
        <Button
          variant="contained"
          sx={{
            border: 3,
            borderColor: "rgba(80, 2, 99, 1)",
            borderRadius: 5,
            color: "white",
            backgroundColor: "rgba(80, 2, 99, 0.25)",
          }}
          // onClick={...} // Přidejte zde logiku pro zobrazení archivovaných seznamů
        >
          Archivované seznamy
        </Button>
      </Box>
    </Box>
  );
}

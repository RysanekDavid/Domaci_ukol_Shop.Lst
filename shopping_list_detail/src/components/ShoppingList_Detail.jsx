import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import Divider from "@mui/material/Divider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Tooltip from "@mui/material/Tooltip";

export default function ListDetailComponent() {
  const [items, setItems] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [listName, setListName] = useState("Název Seznamu");
  const [isEditing, setIsEditing] = useState(false);
  const [originalListName, setOriginalListName] = useState(listName);
  const [isOwner, setIsOwner] = useState(true);
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");

  const handleAddItem = () => {
    if (inputValue) {
      setItems([...items, { name: inputValue, inBasket: false }]);
      setInputValue("");
    }
  };

  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleToggleInBasket = (index) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, inBasket: !item.inBasket } : item
    );
    setItems(newItems);
  };

  const handleEditListName = () => {
    if (!isEditing) {
      setOriginalListName(listName); // Uloží původní hodnotu před začátkem editace
    }
    setIsEditing(!isEditing);
  };
  const handleListNameChange = (e) => {
    setListName(e.target.value);
  };

  function checkEmptyName(event) {
    const newName = event.target.value;
    if (newName.trim() === "") {
      setListName(originalListName);
    }
  }

  const toggleRole = () => {
    setIsOwner(!isOwner);
  };

  const handleAddMember = () => {
    if (newMemberName) {
      setMembers([...members, newMemberName]);
      setNewMemberName("");
    }
  };

  const handleDeleteMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 6,
        border: 2,
        borderColor: "grey.300",
        boxShadow: 6,
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        minWidth: { xl: "80%", lg: "70%", md: "90%", sm: "70%", xs: "80%" },
        minHeight: "90vh",
        maxHeight: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          top: 40,
          position: "absolute",
        }}
      >
        <Tooltip title="TO DO -> Všechny seznamy">
          <IconButton
            sx={{
              ml: 1,
              mr: 1,
              mb: 1,
              border: 2,
              borderColor: "rgba(80, 2, 99, 1)",
              borderRadius: 5,
              padding: 1,

              backgroundColor: "rgba(255, 0, 0, 0.45)",
              fontSize: {
                xl: "2rem",
                lg: "2rem",
                md: "2rem",
                sm: "1.5rem",
                xs: "1.2rem",
              },
            }}
          >
            <ListAltIcon />
          </IconButton>
        </Tooltip>
        {isEditing ? (
          <TextField
            value={listName}
            onChange={handleListNameChange}
            onBlur={(event) => {
              setIsEditing(false);
              checkEmptyName(event);
            }}
            autoFocus
            size="small"
            sx={
              {
                // další styly pro TextField
              }
            }
          />
        ) : (
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            onClick={handleEditListName}
            sx={{
              fontSize: {
                xl: "2rem",
                lg: "2rem",
                md: "2rem",
                sm: "1.5rem",
                xs: "5.4vw",
              },
              fontFamily: "Edu TAS Beginner",
              color: "rgba(80, 2, 99, 1)",
              border: 2,
              borderColor: "rgba(80, 2, 99, 1)",
              borderRadius: 6,
              padding: 1,
              backgroundColor: "rgba(80, 2, 99, 0.1)",

              // další styly pro Typography
            }}
          >
            {listName}
          </Typography>
        )}
        {isOwner && (
          <IconButton
            onClick={handleEditListName}
            sx={{
              ml: 1,
              mb: 1,
              mr: 1,
              border: 2,
              borderColor: "rgba(80, 2, 99, 1)",
              borderRadius: 5,
              backgroundColor: "rgba(80, 2, 99, 0.05)",
              fontSize: {
                xl: "2rem",
                lg: "2rem",
                md: "2rem",
                sm: "1.5rem",
                xs: "1.2rem",
              },
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>
      <Button
        variant="contained"
        onClick={toggleRole}
        sx={{
          fontSize: {
            xs: "0.6rem",
          },
          position: "absolute",
          top: 120,
          right: 8,
        }}
      >
        {isOwner ? "Změna" : "Změna"}
      </Button>

      {isOwner ? (
        <Typography
          sx={{
            fontSize: "1rem",
            position: "absolute",
            top: 154,
            right: 14,
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
            top: 154,
            right: 24,
            fontWeight: "bold",
          }}
        >
          Člen
        </Typography>
      )}
      <List
        sx={{
          width: "100%",
          fontFamily: "Edu TAS Beginner",
          fontSize: {
            xl: "2rem",
            lg: "2rem",
            md: "2rem",
            sm: "1.5rem",
            xs: "1.6rem",
          },
        }}
      >
        {items.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="in-basket"
                  onClick={() => handleToggleInBasket(index)}
                >
                  <CheckIcon color={item.inBasket ? "primary" : "disabled"} />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteItem(index)}
                  sx={{
                    color: "#e00914",
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </>
            }
          >
            {item.name}
          </ListItem>
        ))}
      </List>

      {isOwner && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // ... (další styly)
          }}
        >
          <TextField
            label="Jméno člena"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            size="small"
            sx={{
              ml: 1,
              mr: 1,
              minWidth: "10%",
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
          />
          <Button
            onClick={handleAddMember}
            size="medium"
            sx={{
              minWidth: "10%",
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
      )}

      {isOwner && (
        <List>
          {members.map((member, index) => (
            <ListItem key={index}>
              {member}
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteMember(index)}
                sx={{}}
              >
                <DeleteForeverIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <Divider sx={{ width: "100%", position: "absolute", bottom: 80 }} />

      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: 20,
          }}
        >
          <TextField
            label="Přidat položku"
            value={inputValue}
            variant="outlined"
            size="small"
            sx={{
              ml: 1,
              mr: 1,
              minWidth: "10%",
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
            onClick={handleAddItem}
            size="medium"
            sx={{
              minWidth: "10%",
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
      </Box>
    </Box>
  );
}

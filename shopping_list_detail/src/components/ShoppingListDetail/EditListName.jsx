import React from "react";
import { TextField, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from "axios";
const EditListName = ({
  isEditing,
  setIsEditing,
  listName,
  setListName,
  isOwner,
  listId,
}) => {
  const [originalListName, setOriginalListName] = useState(listName);
  const handleEditListName = () => {
    if (!isEditing) {
      setOriginalListName(listName);
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
    } else {
      setListName(newName);
    }
  }
  const updateListName = async (newName) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/shoppingLists/${listId}`,
        { newName }
      );
      setListName(response.data.name);
    } catch (error) {
      console.error("Error updating list name:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {isEditing ? (
        <TextField
          value={listName}
          onChange={handleListNameChange}
          onBlur={(event) => {
            setIsEditing(false);
            checkEmptyName(event);
            updateListName();
          }}
          autoFocus
          size="small"
          sx={{}}
        />
      ) : (
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontSize: {
              xl: "1.8rem",
              lg: "1.6rem",
              md: "1.6rem",
              sm: "1.5rem",
              xs: "4.6vw",
            },
            fontFamily: "Roboto Slab",
            fontWeight: "bold",
            color: "rgba(80, 2, 99, 1)",
            border: 2,
            borderColor: "rgba(80, 2, 99, 1)",
            borderRadius: 6,
            padding: 1,
            backgroundColor: "rgba(80, 2, 99, 0.1)",
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
          <EditIcon sx={{ color: "rgba(80, 2, 99, 1)" }} />
        </IconButton>
      )}
    </Box>
  );
};

export default EditListName;

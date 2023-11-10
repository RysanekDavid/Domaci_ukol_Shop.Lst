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
import { borderColor } from "@mui/system";

export default function ListDetailComponent() {
  const [items, setItems] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [listName, setListName] = useState("Název Seznamu");
  const [isEditing, setIsEditing] = useState(false);
  const [originalListName, setOriginalListName] = useState(listName);
  const [isOwner, setIsOwner] = useState(true);
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [isMember, setIsMember] = useState(true);
  const [filter, setFilter] = useState("all");

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
    setItems(
      items.map((item, i) => {
        if (i === index) {
          return { ...item, inBasket: !item.inBasket };
        }
        return item;
      })
    );
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

  const handleLeaveList = () => {
    setIsMember(false);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
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
        zIndex: 0,
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
        {!isOwner && isMember && (
          <Button
            onClick={handleLeaveList} // Přidání onClick události
            sx={{
              color: "rgba(80, 2, 99, 1)",
              border: 2,
              borderColor: "#e00914",
              backgroundColor: "rgba(255, 0, 0, 0.75)",
              "&:hover": {
                backgroundColor: "#c00712",
              },
              textTransform: "none",
              fontSize: "1.1rem",
              borderRadius: 4,
              minWidth: "auto",
              position: "absolute",
              right: { xl: 80 },
            }}
          >
            Odejít ze seznamu
          </Button>
        )}

        {!isMember && (
          <p>
            <h2>Opustili jste seznam.</h2>
          </p>
        )}

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
            //onClick={handleEditListName}
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
          top: 6,
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
            top: 12,

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
            top: 12,

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
            lg: "2rem",
            md: "2rem",
            sm: "1.5rem",
            xs: "1.2rem",
          },
          position: "absolute",
          top: { xl: 100, lg: 100, md: 100, sm: 100, xs: 100 },
          left: { xl: 66, lg: 24, md: 24, sm: 24, xs: 24 },
          fontWeight: "bold",
        }}
      >
        Koupit:
      </Typography>
      <List
        sx={{
          width: "90%",
          border: 4,
          borderColor: "rgba(80, 2, 99, 1)",
          borderRadius: 5,
          p: 1,
          maxHeight: { xs: "11.8rem", xl: "30.7rem" },
          minHeight: { xs: "11.8rem", xl: "30.7rem" },
          position: "absolute",
          top: 150,
          overflow: "auto",
          fontFamily: "Edu TAS Beginner",
          fontWeight: "bold",
          fontSize: {
            xl: "1.8rem",
            lg: "2rem",
            md: "2rem",
            sm: "1.5rem",
            xs: "1.24rem",
          },
        }}
      >
        {items
          .filter((item) => !item.inBasket)
          .map((item, index) => (
            <ListItem
              sx={{
                borderBottom: 2,
                mb: 0.5,
                borderRadius: 0,
                borderColor: "rgba(80, 2, 99, 0.5)",
                zIndex: 1,
                display: "flex",
              }}
              key={index}
            >
              <IconButton
                edge="start"
                aria-label="mark-as-done"
                onClick={() => handleToggleInBasket(index)}
                sx={{ mr: 2 }}
              >
                <CheckIcon
                  sx={{
                    fontSize: "1.6rem",
                    border: 2,
                    borderColor: "rgba(80, 2, 99, 1)",
                    borderRadius: 2,
                  }}
                  color={item.inBasket ? "primary" : "inherit"}
                />
              </IconButton>

              {item.name}

              {/* Tlačítko pro odstranění položky, zobrazené pouze pro vlastníka */}
              {isOwner && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteItem(index)}
                  sx={{ color: "#e00914", marginLeft: "auto" }} // Přidán marginLeft: 'auto' pro zarovnání vpravo
                >
                  <DeleteForeverIcon />
                </IconButton>
              )}
            </ListItem>
          ))}
      </List>
      {isOwner && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: 12,
            zIndex: 2,
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
              minWidth: "5rem",
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
      )}

      <Typography
        sx={{
          fontSize: "1.4rem",
          position: "absolute",
          bottom: 14,
          right: 80,
          fontWeight: "bold",
        }}
      >
        Vlastník: David Ryšánek
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xl: "1.6rem",
            lg: "2rem",
            md: "2rem",
            sm: "1.5rem",
            xs: "1.2rem",
          },
          position: "absolute",
          bottom: { xl: 280, lg: 100, md: 100, sm: 100, xs: 100 },
          left: { xl: 66, lg: 24, md: 24, sm: 24, xs: 24 },
          fontWeight: "bold",
        }}
      >
        Seznam členů:
      </Typography>
      <List
        sx={{
          width: "90%",
          border: 4,
          borderColor: "rgba(80, 2, 99, 1)",
          borderRadius: 5,
          p: 1,
          maxHeight: { xs: "11.8rem", xl: "10.8rem" },
          minHeight: { xs: "11.8rem", xl: "10.8rem" },
          position: "absolute",
          bottom: 70,
          overflow: "auto",
          fontFamily: "Edu TAS Beginner",
          fontSize: {
            xl: "1.6rem",
            lg: "2rem",
            md: "2rem",
            sm: "1.5rem",
            xs: "1.24rem",
          },
        }}
      >
        {members.map((member, index) => (
          <ListItem
            sx={{
              borderBottom: 2,
              mb: 0.5,
              borderRadius: 0,
              borderColor: "rgba(80, 2, 99, 0.5)",
              zIndex: 1,
            }}
            key={index}
          >
            {member}

            {isOwner && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteMember(index)}
                sx={{ color: "#e00914" }}
              >
                <DeleteForeverIcon />
              </IconButton>
            )}
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "100%",
          position: "absolute",
          bottom: 70,
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            bottom: 213,
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
                lg: "10rem",
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
            onClick={handleAddItem}
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
      </Box>
    </Box>
  );
}

// Divider šablona:

/*<Divider
        sx={{
          width: "90%",
          position: "absolute",
          bottom: 330,
          zIndex: 2,
          backgroundColor: "rgba(80, 2, 99, 1)",
          borderRadius: 2,
          height: "4px",
        }}
      />
*/

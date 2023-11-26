import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ListDetailComponent() {
  const location = useLocation();
  const [items, setItems] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [listName, setListName] = useState(
    location.state?.listName || "Název Seznamu"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [originalListName, setOriginalListName] = useState(listName);
  const [isOwner, setIsOwner] = useState(true);
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [isMember, setIsMember] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Funkce pro přidání položky
  const handleAddItem = () => {
    if (inputValue) {
      setItems([...items, { name: inputValue, inBasket: false }]);
      setInputValue("");
    }
  };

  const navigateToHome = () => {
    navigate("/"); // přesměruje na domovskou stránku
  };
  // Funkce pro smazání položky
  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // Funkce pro změnu stavu položky
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

  // Funkce pro editaci
  const handleEditListName = () => {
    if (!isEditing) {
      setOriginalListName(listName);
    }
    setIsEditing(!isEditing);
  };
  const handleListNameChange = (e) => {
    setListName(e.target.value);
  };

  // Funkce pro zrušení editace
  function checkEmptyName(event) {
    const newName = event.target.value;
    if (newName.trim() === "") {
      setListName(originalListName);
    } else {
      setListName(newName);
    }
  }

  // Funkce pro změnu Vlastníka / Člena
  const toggleRole = () => {
    setIsOwner(!isOwner);
  };

  // Funkce pro přidání člena
  const handleAddMember = () => {
    if (newMemberName) {
      setMembers([...members, newMemberName]);
      setNewMemberName("");
    }
  };

  // Funkce pro smazání člena
  const handleDeleteMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  // Funkce pro změnu stavu člena (později na odchod ze seznamu)
  const handleLeaveList = () => {
    setIsMember(false);
  };

  // Funkce pro změnu filtru
  const getFilteredItems = () => {
    switch (filter) {
      case "all":
        return items;
      case "done":
        return items.filter((item) => item.inBasket);
      case "undone":
        return items.filter((item) => !item.inBasket);
      default:
        return items;
    }
  };
  return (
    // Box obalující vsechny komponenty
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
          zIndex: 1,
        }}
      >
        {!isOwner && isMember && (
          <Button
            onClick={handleLeaveList}
            sx={{
              color: "rgba(80, 2, 99, 1)",
              border: 2,
              borderColor: "#e00914",
              backgroundColor: "rgba(255, 0, 0, 0.75)",
              position: "absolute",

              top: "58vh",
              right: "4vw",
              "&:hover": {
                backgroundColor: "#c00712",
              },
              textTransform: "none",
              fontSize: "1.1rem",
              borderRadius: 4,
              minWidth: "auto",
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

        <Tooltip title="Všechny Seznamy">
          <IconButton
            onClick={navigateToHome}
            sx={{
              ml: 1,
              mr: 1,
              mb: 1,
              border: 2,
              borderColor: "rgba(80, 2, 99, 1)",
              borderRadius: 5,
              padding: 1,

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
            <ListAltIcon sx={{ color: "rgba(80, 2, 99, 1)" }} />
          </IconButton>
        </Tooltip>
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
      <Button
        variant="contained"
        onClick={toggleRole}
        sx={{
          fontSize: {
            xs: "0.6rem",
          },
          position: "absolute",
          top: 0,
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
            top: 2,
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
            top: 2,
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
            lg: "1.5rem",
            md: "1.5rem",
            sm: "1.4rem",
            xs: "1.1rem",
          },
          position: "absolute",
          top: { xl: 100, lg: 100, md: 90, sm: 110, xs: 125 },
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
          maxHeight: {
            xl: "40vmax",
            lg: "37vh",
            md: "37vh",
            sm: "32vh",
            xs: "11.8rem",
          },
          minHeight: {
            xs: "28vh",
            xl: "40vh",
            lg: "37vh",
            md: "37vh",
            sm: "32vh",
          },
          position: "absolute",
          top: 150,
          zIndex: 1,
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
        {getFilteredItems().map((item, index) => (
          <ListItem
            key={index}
            sx={{
              borderBottom: 2,
              mb: 0.5,
              borderRadius: 0,
              borderColor: "rgba(80, 2, 99, 0.5)",
              zIndex: 1,
              display: "flex",
            }}
          >
            <IconButton
              edge="start"
              aria-label="mark-as-done"
              onClick={() => handleToggleInBasket(index)}
              sx={{
                mr: 2,
              }}
            >
              <CheckIcon
                sx={{
                  fontSize: "1.5rem",
                  border: item.inBasket ? 3 : 2,
                  borderColor: "rgba(80, 2, 99, 1)",
                  borderRadius: 2,
                  backgroundColor: item.inBasket
                    ? "rgba(80, 2, 99, 0.3)"
                    : "transparent",
                }}
                color={item.inBasket ? "primary" : "inherit"}
              />
            </IconButton>

            {item.name}

            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDeleteItem(index)}
              sx={{ color: "#e00914", marginLeft: "auto", marginRight: 1 }}
            >
              <DeleteForeverIcon />
            </IconButton>
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
          fontSize: { xl: "1.4rem", lg: "1.2rem" },
          position: "absolute",
          bottom: 14,
          right: { xl: 80, lg: 24, md: 24, sm: 24, xs: 24 },
          fontWeight: "bold",
          display: {
            xl: "flex",
            lg: "flex",
            md: "flex",
            sm: "none",
            xs: "none",
          },
        }}
      >
        Vlastník: David Ryšánek
      </Typography>
      <Typography
        sx={{
          fontSize: {
            xl: "1.6rem",
            lg: "1.5rem",
            md: "1.5rem",
            sm: "1.4rem",
            xs: "1.2rem",
          },
          position: "absolute",
          bottom: {
            xl: "25vh",
            lg: "27vh",
            md: "28vh",
            sm: "26vh",
            xs: "27vh",
          },
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
          maxHeight: {
            xl: "15vh",
            lg: "15vh",
            md: "15vh",
            sm: "12vh",
            xs: "12.6vh",
          },
          minHeight: {
            xl: "15vh",
            lg: "15vh",
            md: "15vh",
            sm: "10vh",
            xs: "12vh",
          },
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
                sx={{ right: 40, color: "#e00914", position: "absolute" }}
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

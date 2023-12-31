import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { mockListData } from "../mockData";
import AddItemForm from "./AddItemForm";
import ListControls from "./ListControls";
import ListItemControls from "./ListItemControls";
import ListMembers from "./ListMembers";
import EditListName from "./EditListName";
import ListFilters from "./ListFilters";
export default function ListDetailComponent() {
  const { listId } = useParams();
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

  //endpoint /shoppingLists/:listId.

  const fetchListDetails = async (listId) => {
    console.log("Fetching details for listId:", listId);
    if (!listId) {
      console.error("Chyba: Neplatné listId.");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/shoppingLists/${listId}`
      );
      setItems(response.data.items);
      setListName(response.data.name);
      setMembers(response.data.members);
    } catch (error) {
      console.error("Error fetching list details:", error);
    }
  };

  useEffect(() => {
    if (listId) {
      const listDetail = mockListData.find(
        (list) => list.id === parseInt(listId)
      );
      if (listDetail) {
        setItems(listDetail.items);
        setListName(listDetail.name);
        setMembers(listDetail.members);
      } else {
        console.error("Seznam nebyl nalezen.");
      }
    } else {
      console.error("listId undefined, detail seznamu nelze načíst");
    }
  }, [listId]);
  // Funkce pro přidání položky
  const handleAddItem = async () => {
    if (inputValue) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/shoppingLists/${listId}/items`,
          {
            name: inputValue,
            quantity: 1, // Výchozí hdonota
          }
        );
        setItems(response.data.items);
        setInputValue("");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  // Funkce pro smazání položky
  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/shoppingLists/${listId}/items/${itemId}`
      );
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // API pro Editaci Názvu Seznamu

  const updateListName = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/shoppingLists/${listId}`,
        {
          newName: listName,
        }
      );
      setListName(response.data.name);
    } catch (error) {
      console.error("Error updating list name:", error);
    }
  };

  const navigateToHome = () => {
    navigate("/"); // přesměruje na domovskou stránku
  };

  // Funkce pro změnu stavu položky
  const handleToggleInBasket = async (item) => {
    try {
      const updatedItem = { ...item, inBasket: !item.inBasket };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/shoppingLists/${listId}/items/${item._id}`,
        updatedItem
      );

      setItems((prevItems) =>
        prevItems.map((i) => (i._id === item._id ? response.data : i))
      );
    } catch (error) {
      console.error("Error updating item status:", error);
    }
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
        <ListControls
          isOwner={isOwner}
          isMember={isMember}
          handleLeaveList={handleLeaveList}
          navigateToHome={navigateToHome}
        />
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
        <EditListName
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          listName={listName}
          setListName={setListName}
          updateListName={updateListName}
          isOwner={isOwner}
        />
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
            xl: "40vh",
            lg: "37vh",
            md: "37vh",
            sm: "32vh",
            xs: "31vh",
          },
          minHeight: {
            xs: "30vh",
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
            <ListItemControls
              item={item}
              handleToggleInBasket={handleToggleInBasket}
              handleDeleteItem={handleDeleteItem}
            />
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
      <ListMembers
        members={members}
        isOwner={isOwner}
        handleDeleteMember={handleDeleteMember}
      />
      <AddItemForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleAddItem={handleAddItem}
      />
    </Box>
  );
}

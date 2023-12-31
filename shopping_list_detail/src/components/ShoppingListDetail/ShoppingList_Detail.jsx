import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import MemberAddForm from "./MemberAddForm";
import ToggleRole from "./RoleToggleButton";
import ListFilterControls from "./ListFilterControls";
import ThemeSwitcher from "../DarkMode/ThemeSwitcher";
import LanguageSwitcher from "../i18n/TranslationSwitch";
import { useTranslation } from "react-i18next";

export default function ListDetailComponent() {
  const { listId } = useParams();
  const location = useLocation();
  const [items, setItems] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [listName, setListName] = useState(
    location.state?.listName || "Název Seznamu"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [members, setMembers] = useState([]);
  const [newMemberName, setNewMemberName] = useState("");
  const [isMember, setIsMember] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        minWidth: { xl: "94%", lg: "80%", md: "95%", sm: "85%", xs: "96%" },
        minHeight: "90vh",
        maxHeight: "80vh",
        zIndex: 0,
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgb( 8, 8, 7)"
            : "rgba(122, 122, 120, 0.07)",
      }}
    >
      <LanguageSwitcher
        sx={{
          display: "flex",
          position: "absolute",
          top: { xl: 20, lg: 20, md: 20, sm: 20, xs: 0 },
          right: { xl: 90, lg: 90, md: 90, sm: 40, xs: 18 },
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          top: 30,
          position: "absolute",
          zIndex: 1,
        }}
      >
        <ThemeSwitcher
          sx={{
            display: "flex",
            position: "absolute",
            top: { xl: -10, lg: -10, md: -10, sm: -10, xs: -40 },
            left: {
              xl: 80,
              lg: 60,
              md: 50,
              sm: 40,
              xs: 10,
            },
          }}
        />
        <ListControls
          isOwner={isOwner}
          isMember={isMember}
          handleLeaveList={handleLeaveList}
          navigateToHome={navigateToHome}
        />
        <ListFilterControls setFilter={setFilter} />
        <EditListName
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          listName={listName}
          setListName={setListName}
          isOwner={isOwner}
          listId={listId} // Předání listId do komponenty
        />
      </Box>
      <ToggleRole isOwner={isOwner} toggleRole={toggleRole} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          // Other styles
          // Responsive breakpoints
          "@media (min-width:600px)": {
            flexDirection: "row",
          },
        }}
      >
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
                listId={listId}
                setItems={setItems}
              />
            </ListItem>
          ))}
        </List>
        <AddItemForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          listId={listId}
          setItems={setItems}
        />
      </Box>
      {isOwner && (
        <MemberAddForm
          newMemberName={newMemberName}
          setNewMemberName={setNewMemberName}
          handleAddMember={handleAddMember}
        />
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
        {t("Owner")} David Ryšánek
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
            xs: "23vh",
          },
          left: { xl: 66, lg: 24, md: 24, sm: 24, xs: 24 },
          fontWeight: "bold",
        }}
      >
        {t("Members")}
      </Typography>
      <ListMembers
        members={members}
        isOwner={isOwner}
        handleDeleteMember={handleDeleteMember}
      />
    </Box>
  );
}

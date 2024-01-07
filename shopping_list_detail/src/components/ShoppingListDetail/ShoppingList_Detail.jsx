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
import PieChartComponent from "../Charts/PieChartComponent";
import { ResponsiveContainer } from "recharts";

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
  const completedItems = items.filter((item) => item.inBasket).length;
  const remainingItems = items.length - completedItems;

  const pieData = [
    {
      name: "Vyřešené",
      value: completedItems,
      color: "rgba(21, 74, 15, 1)",
    },
    { name: "Nevyřešené", value: remainingItems, color: "rgba(130, 34, 8, 1)" },
  ];

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

  const handleToggleInBasket = (item) => {
    setItems((prevItems) =>
      prevItems.map((i) => {
        if (i.id === item.id) {
          // Změna z _id na id
          return { ...i, inBasket: !i.inBasket };
        }
        return i;
      })
    );
  };

  // Funkce pro změnu stavu položky
  /* const handleToggleInBasket = async (item) => {
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
  };*/

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
        borderRadius: 8,
        border: 5,
        borderColor: "rgba(80, 2, 99,0.2)",
        boxShadow: 20,
        position: "relative",
        maxWidth: "100%",
        mt: 5,
        /*minWidth: {
          xl: "100%",
          lg: "100%",
          md: "100%",
          sm: "100%",
          xs: "100%",
        },*/
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
          top: { xl: 8, lg: 12, md: 12, sm: 8, xs: 6 },
          right: { xl: 90, lg: 90, md: 90, sm: 40, xs: 16 },
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
            top: { xl: -10, lg: -10, md: -10, sm: -10, xs: 50 },
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
          listId={listId}
        />
      </Box>
      <ToggleRole isOwner={isOwner} toggleRole={toggleRole} />
      <Box
        sx={{
          display: "flex",
          minWidth: {
            xl: "80%",
            lg: "70%",
            md: "70%",
            sm: "80%",
            xs: "80%",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
            xl: "row",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            mr: 1,
            minWidth: {
              xl: "98%",
              lg: "98%",
              md: "98%",
              sm: "70%",
              xs: "100%",
            },
            maxHeight: "35vh",
            overflow: "auto",

            mt: 18,
            ml: { xl: -13, lg: -16, md: -13, sm: -4, xs: 0 },
            border: 4,
            borderColor: "rgba(80, 2, 99, 1)",
            borderRadius: 5,
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
          <List sx={{ width: "100%" }}>
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
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            pt: { xl: 18, lg: 15, md: 14, sm: 18, xs: 1 },
            pl: { xl: 0, lg: 0, md: 0, sm: 0, xs: "70%" },
          }}
        >
          <ResponsiveContainer>
            <PieChartComponent data={pieData} />
          </ResponsiveContainer>
        </Box>
      </Box>
      <AddItemForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        listId={listId}
        setItems={setItems}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "94%",
            alignItems: "left",
            mb: { xl: 2 },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xl: "1.6rem",
                lg: "1.5rem",
                md: "1.5rem",
                sm: "1.4rem",
                xs: "1.2rem",
              },
              fontWeight: "bold",
            }}
          >
            {t("Members")}
          </Typography>
        </Box>
        <ListMembers
          members={members}
          isOwner={isOwner}
          handleDeleteMember={handleDeleteMember}
        />

        {isOwner && (
          <MemberAddForm
            newMemberName={newMemberName}
            setNewMemberName={setNewMemberName}
            handleAddMember={handleAddMember}
          />
        )}
      </Box>
    </Box>
  );
}

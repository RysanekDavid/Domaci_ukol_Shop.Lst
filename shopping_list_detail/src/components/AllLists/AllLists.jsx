import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArchiveIcon from "@mui/icons-material/Archive";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import { FilterComponent } from "../AllLists/FilterLists";
import { AddListForm } from "./ListAdd";
import { UserRoleToggle } from "../AllLists/ToggleRole";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { mockListData } from "../mockData";
import ThemeSwitcher from "../DarkMode/ThemeSwitcher";
import LanguageSwitcher from "../i18n/TranslationSwitch";
import { useTranslation } from "react-i18next";
import BarChartComponent from "../Charts/BarChartComponent";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default function ShoppingListsOverview() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [deletingListId, setDeletingListId] = useState(null);
  const [userRole, setUserRole] = useState("owner");
  const { t } = useTranslation();

  const barChartData = lists.map((list) => ({
    name: list.name,
    Počet_položek: list.items.length,
  }));

  /* useEffect(() => {
    api
      .get("/shoppingLists")
      .then((response) => {
        console.log("Data received:", response.data);
        setLists(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the lists:", error);
      });
  }, []);
*/
  useEffect(() => {
    setLoading(true);
    api
      .get("/shoppingLists")
      .then((response) => {
        setLists(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the lists:", error);
        setLists(mockListData); // Nastaví mock data pokud API volání selže
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  const handleClickOpen = (id) => {
    setOpenDialog(true);
    setDeletingListId(id);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const confirmDelete = () => {
    handleDelete(deletingListId);
    handleClose();
  };

  const handleEdit = (id) => {
    console.log("Edit list:");
  };

  const handleAddList = (newList) => {
    setLists([...lists, newList]);
  };

  const handleOpenList = (listId, listName) => {
    navigate(`/detail/${listId}`, { state: { listName } });
  };

  const filteredLists = lists.filter((list) => {
    if (filter === "archived") return list.archived;
    if (filter === "unarchived") return !list.archived;
    return true;
  });

  const handleArchive = (id) => {
    const updatedLists = lists.map((list) => {
      if (list.id === id) {
        return { ...list, archived: !list.archived }; // Přepnutí stavu archivace
      }
      return list;
    });
    setLists(updatedLists);
  };

  return (
    <>
      <ThemeSwitcher
        sx={{ position: "absolute", top: 0, right: "8%", mt: 0.2 }}
      />
      <LanguageSwitcher
        sx={{
          display: "flex",
          position: "absolute",
          zIndex: 1000,
          top: { xl: 70, lg: 70, md: 134, sm: 136, xs: 130 },
          right: { xl: 130, lg: 100, md: 70, sm: 40, xs: 18 },
        }}
      />
      <UserRoleToggle userRole={userRole} setUserRole={setUserRole} />
      <Box sx={{ mt: 2, mb: -7, justifyContent: "center", display: "flex" }}>
        <BarChartComponent data={barChartData} />
      </Box>
      <FilterComponent setFilter={setFilter} />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          mt: 6,
          ml: 2,
          mr: 2,
        }}
      >
        {filteredLists.map((list) => (
          <Card
            key={list.id}
            sx={{
              minWidth: 240,

              border: 4,
              borderColor: "rgba(80, 2, 99, 1)",
              backgroundColor: "rgba(0, 0, 0, 0.95)",
              borderRadius: 6,
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
                  color: "rgba(199, 180, 209, 1)",
                  borderBottom: 3,
                  borderColor: "rgba(80, 2, 99, 1)",
                  borderRadius: 2,
                  fontWeight: "bold",
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
                onClick={() => handleOpenList(list.id, list.name)}
                sx={{
                  borderRadius: 4,
                  minWidth: "0%",
                  mt: 1,
                  mb: -1,
                  color: "rgba(2, 110, 3, 1)",
                  border: 3,
                  fontWeight: "bold",
                  fontSize: 13,

                  backgroundColor: "rgba(0, 0, 0, 0)",
                  "&:hover": {
                    backgroundColor: "rgba(2, 140, 3, 0.1)",
                  },
                }}
              >
                {t("OpenList")}
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
                  borderColor: "rgba(125, 2, 156, 1)",
                  borderRadius: 5,
                  backgroundColor: "rgba(80, 2, 99, 0.25)",
                }}
              >
                <EditIcon
                  sx={{
                    color: "rgba(125, 2, 156, 1)",
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
                onClick={() => handleArchive(list.id)}
                sx={{
                  ml: 1,
                  mb: 1,
                  mr: 1,
                  border: 2,
                  borderColor: list.archived
                    ? "rgba(165, 2, 165, 1)"
                    : "rgba(125, 2, 156, 1)",
                  borderRadius: 5,
                  backgroundColor: list.archived
                    ? "rgba(80, 2, 99, 1)"
                    : "rgba(80, 2, 99, 0.25)",
                }}
              >
                <ArchiveIcon
                  sx={{
                    color: list.archived
                      ? "rgba(181, 0, 224,1)"
                      : "rgba(125, 2, 156, 1)",
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
                  backgroundColor: "rgba(3, 130, 3, 0.15)",
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
              {userRole === "owner" && (
                <IconButton
                  aria-label="delete"
                  onClick={() => handleClickOpen(list.id)}
                  sx={{
                    ml: 1,
                    mb: 1,
                    mr: 1,
                    border: 2,
                    borderColor: "rgba(255, 2, 9, 1)",
                    borderRadius: 5,
                    backgroundColor: "rgba(255, 2, 9, 0.1)",
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
              )}
            </CardActions>
          </Card>
        ))}
        <AddListForm onAddList={handleAddList} />
        <Dialog
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "rgba(23, 22, 22, 01)", // Například tmavě fialové pozadí
              color: "rgba(199, 180, 209,1)",
              border: 4,
              borderRadius: 5,
              borderColor: "rgba(80, 2, 99, 1)",
            },
          }}
          open={openDialog}
          onClose={handleClose}
          BackdropProps={{
            style: {
              backgroundColor: "rgba(0,0,0,0.7)",
            },
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ fontWeight: "bold" }} id="alert-dialog-title">
            {"Potvrdit smazání seznamu"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ color: "rgba(199, 180, 209,1)" }}
              id="alert-dialog-description"
            >
              Opravdu chcete smazat tento seznam?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                color: "grey",
                fontWeight: "bold",
                borderBottom: 3,
              }}
              onClick={handleClose}
            >
              Zrušit
            </Button>
            <Button
              sx={{
                color: "red",
                fontWeight: "bold",
                borderBottom: 3,
              }}
              onClick={confirmDelete}
              autoFocus
            >
              Smazat
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

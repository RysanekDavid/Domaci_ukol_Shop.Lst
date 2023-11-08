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

export default function ListDetailComponent() {
  const [items, setItems] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

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
          display: "flex", // Aktivuje flexbox
          alignItems: "center", // Vertikálně vycentruje položky
          width: "100%", // Nastaví šířku na 100% kontejneru
          justifyContent: "center", // Zarovná položky na střed horizontálně
          top: 40,

          position: "absolute",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            ml: 1, // Přidává margin vlevo
            fontSize: {
              xl: "2rem",
              lg: "2rem",
              md: "2rem",
              sm: "1.5rem",
              xs: "1rem",
            },
            fontFamily: "Edu TAS Beginner",
            color: "rgba(80, 2, 99, 1)",
            border: 2,
            borderColor: "rgba(80, 2, 99, 1)",
            borderRadius: 6,
            padding: 1,
            backgroundColor: "rgba(80, 2, 99, 0.1)",
          }}
        >
          Název Nákupního Seznamu
        </Typography>

        <EditIcon
          sx={{
            ml: { xl: 2, lg: 2, md: 2, sm: 1.5, xs: 1 },
            mb: 0.5,
            border: 2,
            borderColor: "rgba(80, 2, 99, 1)",
            borderRadius: 5,
            padding: 1,
            backgroundColor: "rgba(80, 2, 99, 0.05",
            fontSize: {
              xl: "2rem",
              lg: "2rem",
              md: "2rem",
              sm: "1.5rem",
              xs: "1.2rem",
            },
          }}
        />
      </Box>
      <List
        sx={{
          width: "100%",
          fontFamily: "Edu TAS Beginner",
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
            {item.name} {/* Zobrazuje název položky */}
          </ListItem>
        ))}
      </List>

      <Divider
        sx={{ width: "100%", my: 2, position: "absolute", bottom: 80 }}
      />
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

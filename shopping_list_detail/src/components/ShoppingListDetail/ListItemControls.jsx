// ListItemControls.jsx
import React from "react";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

export default function ListItemControls({
  item,
  handleToggleInBasket,
  listId,
  setItems,
}) {
  const deleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  /* const deleteItem = async (itemId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/shoppingLists/${listId}/items/${itemId}`
      );
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };*/
  return (
    <div>
      <IconButton
        edge="start"
        aria-label="mark-as-done"
        onClick={() => handleToggleInBasket(item)}
        sx={{ mr: 2 }}
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
        onClick={() => deleteItem(item.id)}
        sx={{ color: "#e00914", marginLeft: "auto", marginRight: 1 }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </div>
  );
}

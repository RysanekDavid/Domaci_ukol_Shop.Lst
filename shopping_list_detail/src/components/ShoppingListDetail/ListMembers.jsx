import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function ListMembers({ members, isOwner, handleDeleteMember }) {
  return (
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
  );
}

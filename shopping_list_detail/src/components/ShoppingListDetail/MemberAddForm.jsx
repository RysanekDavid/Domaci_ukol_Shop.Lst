import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const MemberAddForm = ({
  newMemberName,
  setNewMemberName,
  handleAddMember,
}) => {
  const { t } = useTranslation();

  return (
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
        label={t("MemberNamePlaceholder")}
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
        {t("AddItemButton")}
      </Button>
    </Box>
  );
};

export default MemberAddForm;

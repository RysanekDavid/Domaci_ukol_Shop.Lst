import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const MemberAddForm = ({
  newMemberName,
  setNewMemberName,
  handleAddMember,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          flexGrow: 1,
          pt: 2,
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

      <Typography
        sx={{
          fontSize: { xl: "1.4rem", lg: "1.2rem" },
          fontWeight: "bold",

          pl: { xl: "70vw", lg: "70vw", md: "70vw" },

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
    </>
  );
};

export default MemberAddForm;

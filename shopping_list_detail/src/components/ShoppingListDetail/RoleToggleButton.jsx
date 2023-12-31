import React from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

const RoleToggleButton = ({ isOwner, toggleRole }) => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Button
          variant="contained"
          onClick={toggleRole}
          sx={{
            fontSize: {
              xs: "0.6rem",
            },
            position: "absolute",
            top: -40,
            left: { xs: "65%", md: "55%", lg: "55%", xl: "55%" },
          }}
        >
          {isOwner ? "Změna" : "Změna"}
        </Button>
        <Typography
          sx={{
            fontSize: "1rem",
            position: "absolute",
            top: -35,
            fontWeight: "bold",
            left: { xs: "40%", sm: "40%", md: "40%", lg: "45%", xl: "40%" },
          }}
        >
          {isOwner ? "Vlastník" : "Člen"}
        </Typography>
      </Box>

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
        {t("InCart")}
      </Typography>
    </>
  );
};

export default RoleToggleButton;

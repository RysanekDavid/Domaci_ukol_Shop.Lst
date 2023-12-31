import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function UserRoleToggle({ userRole, setUserRole }) {
  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        top: 0,
        zIndex: 3,
        ml: 2,
        mt: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          mr: 2,
          display: {
            xl: "flex",
            lg: "flex",
            md: "flex",
            sm: "flex",
            xs: "none",
          },
        }}
        variant="caption"
      >
        Aktuální role: {userRole}
      </Typography>
      <Button
        variant="contained"
        onClick={() => setUserRole(userRole === "owner" ? "member" : "owner")}
      >
        Přepnout roli
      </Button>
    </Box>
  );
}

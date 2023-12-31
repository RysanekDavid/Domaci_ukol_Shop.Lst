import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/material/Box";
import LanguageIcon from "@mui/icons-material/Language";

function LanguageSwitcher({ sx }) {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang) => {
    if (lang) i18n.changeLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", ...sx }}>
      <LanguageIcon
        sx={{
          mr: 1,
          mt: 1,
          color: "rgba(80, 2, 99, 0.95)",
          display: {
            xs: "none",
            sm: "flex",
            md: "flex",
            lg: "flex",
            xl: "flex",
          },
        }}
      />
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{ color: "black", backgroundColor: "rgba(80, 2, 99, 0.55)" }}
      >
        {i18n.language.toUpperCase()}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleClose("en")}>EN</MenuItem>
        <MenuItem onClick={() => handleClose("cz")}>CZ</MenuItem>
      </Menu>
    </Box>
  );
}

export default LanguageSwitcher;

import React, { useContext } from "react";
import { ThemeContext } from "./DarkMode";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = ({ sx }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width:898px)");
  const { t } = useTranslation();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Box
      key={theme}
      sx={{
        display: "flex",
        border: 2,
        borderRadius: 4,
        bgcolor: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(110, 166, 240, 0.1)"
            : "rgba(247, 204, 104, 0.4)",
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: { xl: 18, lg: 18, md: 18, sm: 16, xs: 15 },
          mt: 0.5,
          ml: 1.5,
          mr: 2,
          fontFamily: "Roboto",
          fontWeight: "bold",
          display: {
            xl: "flex",
            lg: "flex",
            md: "flex",
            sm: "none",
            xs: "none",
          },
        }}
        variant="caption"
      >
        {isMobile ? t("DMCaptionShort") : t("DMCaptionLong")}
      </Typography>
      {theme === "dark" ? (
        <DarkModeIcon
          sx={{
            fontSize: { xl: 20, lg: 20, md: 20, sm: 20, xs: 20 },
            mt: 1.1,
            ml: { xl: 0, lg: 0, md: 0, sm: 1, xs: 1 },
            color: "rgba(110, 166, 240, 1)",
          }}
        />
      ) : (
        <LightModeIcon
          sx={{
            fontSize: 20,
            mt: 1.1,
            ml: { xl: 0, lg: 0, md: 0, sm: 1, xs: 1 },
            color: "rgba(245, 111, 66, 1)",
          }}
        />
      )}
      <Switch
        sx={{
          //border: "1px solid black",
          //borderRadius: "16%",
          mr: { xl: 1, lg: 1, md: 1, sm: 1, xs: 0 },
        }}
        checked={theme === "dark"}
        onChange={toggleTheme}
        name="themeSwitch"
        inputProps={{ "aria-label": "theme switch" }}
      />
    </Box>
  );
};

export default ThemeSwitcher;

import React, { useContext } from "react";
import { ThemeContext } from "./DarkMode";
import Switch from "@mui/material/Switch";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleTheme}
      name="themeSwitch"
      inputProps={{ "aria-label": "theme switch" }}
    />
  );
};

export default ThemeSwitcher;

import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContext } from "./components/DarkMode/DarkMode.js";
import ShoppingListsOverview from "./components/AllLists/AllLists.jsx";
import HomePage from "./components/ShoppingListDetail/ShoppingList_Detail.jsx";

function App() {
  const { theme } = useContext(ThemeContext);

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      ...(theme === "light"
        ? {
            background: {
              default: "rgba(163, 161, 155, 0.3)", // Barva pozadí pro světlý režim
            },
          }
        : {
            background: {
              default: "rgba(46, 45, 42, 1)", // Barva pozadí pro tmavý režim
            },
          }),
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/detail/:listId" element={<HomePage />} />
          <Route path="/" element={<ShoppingListsOverview />} />
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;

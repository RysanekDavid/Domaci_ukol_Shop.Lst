import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, ThemeContext } from "./components/DarkMode";
import ShoppingListsOverview from "./components/AllLists/AllLists.jsx";
import HomePage from "./components/ShoppingListDetail/ShoppingList_Detail.jsx";

function App() {
  const { theme } = useContext(ThemeContext); // Použijte ThemeContext pro získání aktuálního tématu

  // Vytvoření tématu na základě aktuálního stavu
  const muiTheme = createTheme({
    palette: {
      mode: theme, // Nastavte režim podle aktuálního tématu
    },
  });

  return (
    <ThemeProvider>
      {" "}
      {/* Váš ThemeProvider */}
      <MuiThemeProvider theme={muiTheme}>
        {" "}
        {/* MUI ThemeProvider s vytvořeným tématem */}
        <CssBaseline /> {/* Normalizuje styly a aplikuje barvu pozadí tématu */}
        <Router>
          <Routes>
            <Route path="/detail/:listId" element={<HomePage />} />
            <Route path="/" element={<ShoppingListsOverview />} />
          </Routes>
        </Router>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;

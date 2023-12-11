import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import ShoppingListsOverview from "./components/AllLists/AllLists.jsx";
import HomePage from "./components/ShoppingList_Detail.jsx";

function App() {
  return (
    <Router>
<Routes>
  <Route path="/detail/:listId" element={<HomePage />} />
  <Route path="/" element={<ShoppingListsOverview />} />
</Routes>

    </Router>
  );
}

export default App;

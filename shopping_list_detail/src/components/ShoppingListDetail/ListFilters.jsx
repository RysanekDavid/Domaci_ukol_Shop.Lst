// ListFilters.jsx
import React from "react";
import Button from "@mui/material/Button";

export default function ListFilters({ setFilter }) {
  return (
    <div>
      <Button onClick={() => setFilter("all")}>Vše</Button>
      <Button onClick={() => setFilter("done")}>Hotovo</Button>
      <Button onClick={() => setFilter("undone")}>Nedokončeno</Button>
    </div>
  );
}

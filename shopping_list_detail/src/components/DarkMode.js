import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Načteme uložené téma z localStorage nebo výchozí hodnotu 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Uložíme změnu tématu do localStorage, kdykoliv se změní hodnota theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

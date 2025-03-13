"use client";

import { useEffect, useState, createContext, useContext } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LinearProgress, Stack } from "@mui/material";

const ThemeContext = createContext({ mode: "dark", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    setMode(savedTheme ?? "dark");
  }, []);

  useEffect(() => {
    if (mode) {
      localStorage.setItem("theme", mode);
      document.documentElement.setAttribute("data-theme", mode);
    }
  }, [mode]);

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const muiTheme = createTheme({
    palette: {
      mode: mode ?? "dark",
    },
  });

  if (mode === null)
    return (
      <Stack sx={{ width: "100%" }}>
        <LinearProgress color="primary" />
      </Stack>
    );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

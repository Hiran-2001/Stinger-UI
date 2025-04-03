import { create } from "zustand";

// Define Theme Types
type ThemeMode = "light" | "dark";

type ThemeState = {
  mode: ThemeMode;
  theme: {
    primary: string;
    background: string;
    card: {
      bg: string;
      text: string;
      border: string;
    };
    button: {
      bg: string;
      text: string;
    };
  };
  toggleTheme: () => void;
};

// Define Themes
const lightTheme = {
  primary: "#1976d2",
  background: "#ffffff",
  card: {
    bg: "#f5f5f5",
    text: "#000000",
    border: "#e0e0e0",
  },
  button: {
    bg: "#1976d2",
    text: "#ffffff",
  },
};

const darkTheme = {
  primary: "#90caf9",
  background: "#121212",
  card: {
    bg: "#1e1e1e",
    text: "#ffffff",
    border: "#333333",
  },
  button: {
    bg: "#90caf9",
    text: "#000000",
  },
};

// Create Zustand Store
export const useThemeStore = create<ThemeState>((set) => ({
  mode: (localStorage.getItem("theme") as ThemeMode) || "light",
  theme: localStorage.getItem("theme") === "dark" ? darkTheme : lightTheme,
  toggleTheme: () =>
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return {
        mode: newMode,
        theme: newMode === "light" ? lightTheme : darkTheme,
      };
    }),
}));

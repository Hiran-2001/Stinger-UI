import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useThemeStore } from './store/useThemeStore.ts';

// Wrapper component to apply theme from Zustand
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { mode, theme } = useThemeStore();

  const muiTheme = createTheme({
    palette: {
      mode: mode,
      primary: { main: theme.primary },
      background: { default: theme.background },
      text: { primary: theme.card.text },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  // <ThemeWrapper>
    <App />
  // </ThemeWrapper>
  // </StrictMode>,
)

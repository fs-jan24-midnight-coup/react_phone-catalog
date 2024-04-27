import { PaletteMode } from '@mui/material';

export interface ThemeChangeContextProps {
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
  prefersDarkMode: boolean;
}

export interface ThemeChangeProviderProps {
  children: React.ReactNode;
}

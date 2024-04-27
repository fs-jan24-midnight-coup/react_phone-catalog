import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
    secondaryAccent: Palette['primary'];
    icon: Palette['primary'];
    element: Palette['primary'];
    hoverBg: Palette['primary'];
    white: Palette['primary'];
    green: Palette['primary'];
    red: Palette['primary'];
    backgoundPrimary: Palette['primary'];
    backgoundSecondary: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    secondaryAccent?: PaletteOptions['primary'];
    icon?: PaletteOptions['primary'];
    element?: PaletteOptions['primary'];
    hoverBg?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
    red?: PaletteOptions['primary'];
    backgoundPrimary?: PaletteOptions['primary'];
    backgoundSecondary?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    primary: true;
    accent: true;
    secondaryAccent: true;
    icon: true;
    element: true;
    hoverBg: true;
    white: true;
    green: true;
    red: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    accent: true;
    secondaryAccent: true;
    icon: true;
    element: true;
    hoverBg: true;
    white: true;
    green: true;
    red: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    primary: true;
    accent: true;
    secondaryAccent: true;
    icon: true;
    element: true;
    hoverBg: true;
    white: true;
    green: true;
    red: true;
  }
}

declare module '@mui/material/Badge' {
  interface BadgePropsColorOverrides {
    accent: true;
    secondaryAccent: true;
    icon: true;
    element: true;
    hoverBg: true;
    white: true;
    green: true;
    red: true;
  }
}

export const customPaletteLightMode = {
  primary: { main: '#0F0F11' },
  secondary: { main: '#89939A' },
  accent: { main: '#F86800' },
  secondaryAccent: { main: '#476DF4' },
  icon: { main: '#B4BDC3' },
  element: { main: '#e2e6e9' },
  hoverBg: { main: '#FAFBFC' },
  white: { main: '#FFFFFF' },
  green: { main: '#27AE60' },
  red: { main: '#EB5757' },
  backgoundPrimary: { main: '#FAFBFC' },
  backgoundSecondary: { main: '#FFF' },
};

export const customPaletteDarkMode = {
  primary: { main: '#FFF' },
  secondary: { main: '#89939A' },
  accent: { main: '#905BFF' },
  secondaryAccent: { main: '#EB5757' },
  icon: { main: '#FFF' },
  element: { main: '#FFF' },
  hoverBg: { main: '#FAFBFC' },
  white: { main: '#FFFFFF' },
  green: { main: '#27AE60' },
  red: { main: '#EB5757' },
  info: { main: '#EB5757' },
  backgoundPrimary: { main: '#0F1121' },
  backgoundSecondary: { main: '#161827' },
};

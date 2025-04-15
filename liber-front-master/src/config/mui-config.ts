import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { COLORS } from './styles-config';

export interface CustomPalette {
  bgColor: string;
  text: {
    main: string;
    body1: string;
    body2: string;
    disabled: string;
    sub: string;
    info: string;
  };
  linear: {
    primary: string;
  };
  icon: {
    light: string;
  };
}

const getDesignTokens = (mode: PaletteMode) => ({
  // mui vars
  // 1rem = 16px
  // 1 line-height = 14
  palette: {
    mode,
    bgColor: mode === 'dark' ? COLORS.darkBg : COLORS.bg,
    color: mode === 'dark' ? COLORS.darkTextMain : COLORS.textMain,
    bgInput: mode === 'dark' ? COLORS.darkInput : COLORS.white,
    primary: {
      main: COLORS.secondary,
      dark: COLORS.primaryVariant,
    },
    secondary: {
      main: COLORS.secondary,
    },
    error: {
      main: COLORS.secondary,
    },
    success: {
      main: COLORS.success,
    },
    text: {
      primary: COLORS.textMain,
      secondary: COLORS.secondary,
      disabled: COLORS.disabled,
    },
  },
  typography: {
    fontFamily: 'inherit',
    h1: {
      fontSize: '6rem', // 96px
      fontWeight: 700,
      lineHeight: '8rem', // 112px
    },
    h2: {
      fontSize: '3.75rem', // 60px
      fontWeight: 600,
      lineHeight: '4.5rem', // 72px
    },
    h3: {
      fontSize: '3rem', // 48px
      lineHeight: '4.5rem', // 56px
      fontWeight: 500,
    },
    h4: {
      fontSize: '2.125rem',
      lineHeight: '2.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem',
      lineHeight: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
      fontWeight: 500,
    },

    subtitle1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.5, // 24px
      fontWeight: 500,
      letterSpacing: '0.01071428571rem',
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: '1.25', // 20px
      fontWeight: 400,
      letterSpacing: '0.00714285714rem', // 0.1px
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.5, // 24px
      fontWeight: 400,
      letterSpacing: '0.03125rem', // 0.5px

    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '1.25', // 20px
      fontWeight: 400,
      letterSpacing: '0.01785714285rem', // 0.25px
    },
    button: {
      fontSize: '0.875rem',
      lineHeight: '1rem', // 16px
      fontWeight: 500,
      letterSpacing: '0.08928571428rem', // 1.25px
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: '1rem', // 16px
      fontWeight: 400,
      letterSpacing: '0.02857142857rem', // 0.4px
    },
    overline: {
      fontSize: '0.625rem',
      lineHeight: '1rem', // 16px
      fontWeight: 500,
      letterSpacing: '0.10714285714rem', // 1.5px
    },
  },
  breakpoints: {
    values: {
      xl: 1440,
      lg: 1290,
      md: 1024,
      sm: 780,
      xs: 500,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? COLORS.darkTextMain : COLORS.textMain,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: COLORS.primary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          fontSize: '1.125rem',
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor:
            mode === 'dark' ? COLORS.darkInput : COLORS.primaryVariant,
          color: mode === 'dark' ? COLORS.darkGray : COLORS.white,
        },
      },
      defaultProps: {
        variant: 'contained',
        color: 'primary',
        size: 'medium',
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.06);',
        },
      },
    },
  },
});

export default getDesignTokens;

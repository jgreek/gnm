'use client';

import { createTheme } from '@mui/material/styles';

// In your theme.ts/js file
export const theme = createTheme({
    palette: {
    primary: {
      main: '#2563EB', // Bright blue
      light: '#3B82F6',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#8B5CF6', // Purple
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, #c1666b 0%, #994f54 100%)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }
        }
      }
    }
  }
});

export default theme;
'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
 palette: {
   primary: {
     main: '#c1666b',      // Rose color for primary actions
     light: '#d4838a',     // Lighter rose
     dark: '#994f54',      // Darker rose
   },
   secondary: {
     main: '#4A90E2',      // Blue for secondary actions
     light: '#5EA2E7',     // Lighter blue
     dark: '#2171CD',      // Darker blue
   },
   background: {
     default: '#FAFAFA',   // Very light gray for main background
     paper: '#FFFFFF',     // White for cards/elevated surfaces
   },
   text: {
     primary: '#2C3E50',   // Dark blue-gray for primary text
     secondary: '#7F8C8D', // Medium gray for secondary text
   },
   error: {
     main: '#E74C3C',      // Red for errors
   },
   warning: {
     main: '#F39C12',      // Orange for warnings
   },
   success: {
     main: '#2ECC71',      // Green for success states
   },
   info: {
     main: '#3498DB',      // Blue for info states
   },
 },
 typography: {
   fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
   h1: {
     fontSize: '3rem',
     fontWeight: 700,
     letterSpacing: '-0.01562em',
   },
   h2: {
     fontSize: '2.25rem',
     fontWeight: 600,
     letterSpacing: '-0.00833em',
   },
   h3: {
     fontSize: '1.875rem',
     fontWeight: 600,
     letterSpacing: '0em',
   },
   h4: {
     fontSize: '1.5rem',
     fontWeight: 600,
     letterSpacing: '0.00735em',
   },
   body1: {
     fontSize: '1rem',
     lineHeight: 1.6,
     letterSpacing: '0.00938em',
   },
   body2: {
     fontSize: '0.875rem',
     lineHeight: 1.6,
     letterSpacing: '0.01071em',
   },
   button: {
     textTransform: 'none',
     fontWeight: 600,
   },
 },
 shape: {
   borderRadius: 12,
 },
 spacing: 8,
 components: {
   MuiButton: {
     styleOverrides: {
       root: {
         borderRadius: 8,
         padding: '8px 24px',
         boxShadow: 'none',
         '&:hover': {
           boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
         },
       },
       contained: {
         '&:hover': {
           transform: 'translateY(-1px)',
         },
       },
     },
   },
   MuiCard: {
     styleOverrides: {
       root: {
         borderRadius: 16,
         boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
       },
     },
   },
   MuiAppBar: {
     styleOverrides: {
       root: {
         boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
       },
     },
   },
 },
});

export default theme;
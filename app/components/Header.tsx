import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GNMLogo from "@/app/components/Logo";
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const buttonStyle = {
  color: 'white',
  fontWeight: 500,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '2px',
    bottom: '4px',
    left: '50%',
    background: 'white',
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': {
    width: '60%',
  }
};

export default function Header() {
  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar sx={{ padding: '0.5rem 2rem' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
          <GNMLogo width={40} height={40}/>
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
            Gringas No Mundo
          </Typography>
        </Link>
        <Box sx={{ marginLeft: 'auto', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/" passHref><Button sx={buttonStyle}>Home</Button></Link>
            <Link href="/admin/cases" passHref><Button sx={buttonStyle}>Cases</Button></Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="contained" sx={{ bgcolor: 'white', color: '#2563EB', fontWeight: 500, px: 3, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)', transform: 'translateY(-1px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }, transition: 'all 0.2s ease' }}>Sign in</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: { width: '36px', height: '36px' } } }} />
            </SignedIn>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

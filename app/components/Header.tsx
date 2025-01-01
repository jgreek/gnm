'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GNMLogo from "@/app/components/Logo";
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const router = useRouter();

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        cursor: 'pointer'
                    }}
                    onClick={() => router.push('/')}
                >
                    <GNMLogo width={40} height={40}/>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            letterSpacing: 1
                        }}
                    >
                        Gringas No Mundo
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link href="/" passHref style={{ textDecoration: 'none' }}>
                        <Button
                            color="inherit"
                            sx={{
                                'color': "white",
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            Home
                        </Button>
                    </Link>
                    <Link href="/admin/cases" passHref style={{ textDecoration: 'none' }}>
                        <Button
                            color="inherit"
                            sx={{
                                'color': "white",
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            Cases
                        </Button>
                    </Link>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
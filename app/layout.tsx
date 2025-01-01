"use client";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import theme from "@/themes/theme";
import {ClerkProvider,} from "@clerk/nextjs";


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}>
                    <Header/>
                    <main style={{flex: 1, padding: '2rem'}}>
                        {children}
                    </main>
                    <Footer/>
                </div>
            </ThemeProvider>
            </body>
            </html>
        </ClerkProvider>

    );
}
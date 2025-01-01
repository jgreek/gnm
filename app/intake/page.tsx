'use client';

import { useUser } from "@clerk/nextjs";
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import IntakeWizard from "@/app/components/IntakeWizard";

export default function IntakePage() {
  const { isLoaded, isSignedIn } = useUser();

  const handleComplete = () => {
    // Handle completion, maybe redirect to another page
    console.log('Intake completed');
  };

  // Show loading state while Clerk loads
  if (!isLoaded) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Legal Intake Form
        </Typography>
        <IntakeWizard onCompleteAction={handleComplete} />
      </Box>
    </Container>
  );
}
'use client';

import { Container, Box, Typography } from '@mui/material';
import IntakeWizard from "@/app/components/IntakeWizard";

export default function IntakePage() {
  const handleComplete = () => {
    // Handle completion, maybe redirect to another page
    console.log('Intake completed');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Legal Intake Form
        </Typography>
        <IntakeWizard onComplete={handleComplete} />
      </Box>
    </Container>
  );
}
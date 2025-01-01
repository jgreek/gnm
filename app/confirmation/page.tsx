
'use client';

import { Box, Typography, Paper, Container } from '@mui/material';

export default function ConfirmationPage() {
  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Thank You for Your Submission
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your legal question has been successfully submitted.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Our team will review your question and connect you with an appropriate legal expert within 24 hours.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
'use client';

import { useUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Grid,
} from '@mui/material';
import { format } from 'date-fns';
import { useCases } from "@/app/hooks/useCases";

export default function CasesAdmin() {
  const { user, isLoaded } = useUser();
  const { cases, loading, error } = useCases();

  // Wait for Clerk to load
  if (!isLoaded) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Check for admin permission
  if (isLoaded && user?.publicMetadata?.role !== 'admin') {
    redirect('/');
  }

  // Loading state for cases
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Legal Cases
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {cases.length} cases found
      </Typography>
      <Grid container spacing={3}>
        {cases.map((caseItem) => (
          <Grid item xs={12} md={6} lg={4} key={caseItem.id}>
            <Card>
              <CardContent>
                <Box mb={2} display="flex" gap={1} flexWrap="wrap">
                  <Chip
                    label={caseItem.state}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={caseItem.caseType}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {format(new Date(caseItem.timestamp), 'PPp')}
                  </Typography>
                </Box>
                <Typography variant="body1" gutterBottom>
                  {caseItem.description}
                </Typography>
                {caseItem.additionalInfo && (
                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                      Additional Information:
                    </Typography>
                    <Typography variant="body2">
                      {caseItem.additionalInfo}
                    </Typography>
                  </Box>
                )}
                <Typography variant="caption" color="text.secondary">
                  ID: {caseItem.id}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
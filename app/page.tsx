'use client';

import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import WorkIcon from '@mui/icons-material/Work';

export default function Home() {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 500,
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4,
          }}
        >
          Professional Opportunities for Brazilian Talent
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: '#64748B',
            mb: 6,
          }}
        >
          Expert guidance for Brazilian professionals seeking career advancement
          in the United States
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.push('/intake')}
          sx={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
            },
            py: 2,
            px: 4,
            borderRadius: 2,
            transition: 'all 0.3s ease',
          }}
        >
          Request Consultation
        </Button>
      </Box>

      {/* Services Cards */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {[
          {
            icon: <SearchIcon sx={{ fontSize: 48, color: '#2563EB', mb: 2 }} />,
            title: 'Career Placement',
            description:
              'Comprehensive support for professional placement and career development',
            isDisabled: true,
          },
          {
            icon: (
              <PostAddIcon sx={{ fontSize: 48, color: '#2563EB', mb: 2 }} />
            ),
            title: 'Employment Resources',
            description:
              'Access vital information about work authorization and immigration',
            link: '/employment-resources',
            isDisabled: false,
          },
          {
            icon: <WorkIcon sx={{ fontSize: 48, color: '#2563EB', mb: 2 }} />,
            title: 'Opportunity Network',
            description:
              'Connect with companies seeking Brazilian professional talent',
            isDisabled: true,
          },
        ].map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                },
                border: '1px solid rgba(37, 99, 235, 0.1)',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                {service.icon}
                <Typography variant="h5" gutterBottom sx={{ color: '#1E293B' }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="#64748B">
                  {service.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  size="large"
                  disabled={service.isDisabled}
                  onClick={() => service.link && router.push(service.link)}
                  sx={{
                    color: '#2563EB',
                    '&.Mui-disabled': {
                      color: '#94A3B8',
                    },
                  }}
                >
                  {service.isDisabled ? 'Coming Soon' : 'Learn More'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

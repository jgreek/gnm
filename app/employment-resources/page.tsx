'use client';

import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import { useState, useCallback, JSX } from 'react';

interface ResourceSection {
  title: string;
  content: string;
  bulletPoints?: string[];
}

const EmploymentResources = (): JSX.Element => {
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

  const handlePanelChange = useCallback(
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanel(isExpanded ? panel : false);
    },
    []
  );

  const resourceSections: ResourceSection[] = [
    {
      title: 'Employment-Based Green Cards',
      content:
        'There are several categories of employment-based green cards available:',
      bulletPoints: [
        'EB-1: Priority Workers (Extraordinary Ability)',
        'EB-2: Advanced Degree or Exceptional Ability',
        'EB-3: Skilled Workers, Professionals',
        'EB-4: Special Immigrants',
        'EB-5: Immigrant Investors',
      ],
    },
    {
      title: 'Marriage-Based Green Cards',
      content: 'For those married to U.S. citizens or permanent residents:',
      bulletPoints: [
        'Immediate relative status if married to a U.S. citizen',
        'Priority date considerations for marriage to permanent residents',
        'Documentation requirements and interview process',
        'Rights and responsibilities during the process',
      ],
    },
    {
      title: 'Professional Development',
      content:
        'Ways to enhance your professional profile while pursuing permanent residency:',
      bulletPoints: [
        'Professional certification programs accepted in the U.S.',
        'English language proficiency improvements',
        'Networking opportunities in your field',
        'Professional association memberships',
      ],
    },
    {
      title: 'Legal Considerations',
      content: 'Important legal aspects to consider:',
      bulletPoints: [
        'Maintaining valid immigration status throughout the process',
        'Work authorization requirements and restrictions',
        'Timeline expectations and processing times',
        'Document preparation and maintenance',
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 500,
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Employment Resources for Brazilian Professionals
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Comprehensive Guide to U.S. Employment and Immigration
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: '#F8FAFC' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InfoIcon sx={{ color: '#2563EB', mr: 2 }} />
          <Typography variant="h6">Important Notice</Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          This information is for general guidance only and should not be
          considered legal advice. We recommend booking a scheduled consultation
          with us for the best result.
        </Typography>
      </Paper>

      {resourceSections.map((section, index) => (
        <Accordion
          key={index}
          expanded={expandedPanel === `panel${index}`}
          onChange={handlePanelChange(`panel${index}`)}
          sx={{
            mb: 2,
            '&:before': { display: 'none' },
            boxShadow: 'none',
            border: '1px solid rgba(37, 99, 235, 0.1)',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
            }}
          >
            <Typography variant="h6">{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>{section.content}</Typography>
            {section.bulletPoints && (
              <List>
                {section.bulletPoints.map((point, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon sx={{ color: '#2563EB' }} />
                    </ListItemIcon>
                    <ListItemText primary={point} />
                  </ListItem>
                ))}
              </List>
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)',
            },
          }}
        >
          Schedule a Consultation
        </Button>
      </Box>
    </Container>
  );
};

export default EmploymentResources;

'use client';

import {
 Box,
 Typography,
 Button,
 Container,
 Grid,
 Card,
 CardContent,
 CardActions
} from '@mui/material';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import PostAddIcon from '@mui/icons-material/PostAdd';
import WorkIcon from '@mui/icons-material/Work';

export default function Home() {
 const router = useRouter();

    return (  <Container maxWidth="lg">
     {/* Hero Section */}
     <Box
       sx={{
         textAlign: 'center',
         py: 8
       }}
     >
       <Typography
         variant="h2"
         gutterBottom
         sx={{
           fontWeight: 700,
           color: '#c1666b',
           mb: 4
         }}
       >
         Professional Opportunities for Brazilian Talent
       </Typography>

       <Typography
         variant="h5"
         gutterBottom
         sx={{
           color: 'text.secondary',
           mb: 6
         }}
       >
         Expert guidance for Brazilian professionals seeking career advancement in the United States
       </Typography>

       <Button
         variant="contained"
         size="large"
         onClick={() => router.push('/intake')}
         sx={{
           bgcolor: '#c1666b',
           '&:hover': {
             bgcolor: '#a85c61',
           },
           py: 2,
           px: 4,
           borderRadius: 2
         }}
       >
         Request Consultation
       </Button>
     </Box>

     {/* Services Cards */}
     <Grid container spacing={4} sx={{ mb: 8 }}>
       <Grid item xs={12} md={4}>
         <Card
           sx={{
             height: '100%',
             display: 'flex',
             flexDirection: 'column',
             opacity: 0.7,
           }}
         >
           <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
             <SearchIcon sx={{ fontSize: 48, color: '#c1666b', mb: 2 }} />
             <Typography variant="h5" gutterBottom>
               Career Placement
             </Typography>
             <Typography variant="body1" color="text.secondary">
               Comprehensive support for professional placement and career development
             </Typography>
           </CardContent>
           <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
             <Button
               size="large"
               disabled
               sx={{ color: '#c1666b' }}
             >
               Coming Soon
             </Button>
           </CardActions>
         </Card>
       </Grid>

       <Grid item xs={12} md={4}>
         <Card
           sx={{
             height: '100%',
             display: 'flex',
             flexDirection: 'column',
             opacity: 0.7,
           }}
         >
           <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
             <PostAddIcon sx={{ fontSize: 48, color: '#c1666b', mb: 2 }} />
             <Typography variant="h5" gutterBottom>
               Employment Resources
             </Typography>
             <Typography variant="body1" color="text.secondary">
               Access vital information about work authorization and immigration
             </Typography>
           </CardContent>
           <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
             <Button
               size="large"
               disabled
               sx={{ color: '#c1666b' }}
             >
               Coming Soon
             </Button>
           </CardActions>
         </Card>
       </Grid>

       <Grid item xs={12} md={4}>
         <Card
           sx={{
             height: '100%',
             display: 'flex',
             flexDirection: 'column',
             opacity: 0.7,
           }}
         >
           <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
             <WorkIcon sx={{ fontSize: 48, color: '#c1666b', mb: 2 }} />
             <Typography variant="h5" gutterBottom>
               Opportunity Network
             </Typography>
             <Typography variant="body1" color="text.secondary">
               Connect with companies seeking Brazilian professional talent
             </Typography>
           </CardContent>
           <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
             <Button
               size="large"
               disabled
               sx={{ color: '#c1666b' }}
             >
               Coming Soon
             </Button>
           </CardActions>
         </Card>
       </Grid>
     </Grid>
   </Container>
 );
}
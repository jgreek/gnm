'use client';

import {
 Box,
 TextField,
 Select,
 MenuItem,
 FormControl,
 InputLabel,
 Button,
 Typography,
 FormHelperText,
 Paper
} from '@mui/material';
import { useRouter } from 'next/navigation';
import {useIntakeForm} from "@/app/hooks/useIntakeForm";

interface IntakeWizardProps {
  onCompleteAction: () => void;  // Renamed to indicate Server Action
}

export const IntakeWizard: React.FC<IntakeWizardProps> = ({ onCompleteAction }) => {
 const router = useRouter();

  const handleFormComplete = () => {
    onCompleteAction();
    router.push('/confirmation'); // Add the path to your confirmation page
  };

  const {
    formData,
    errors,
    isLoading,
    error,
    handleChange,
    handleSubmit
  } = useIntakeForm(handleFormComplete);

 return (
   <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
     <Typography variant="h6" gutterBottom>
       Thank you for submitting your legal question
     </Typography>

     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
       <TextField
         value={formData.description}
         onChange={handleChange('description')}
         multiline
         rows={4}
         label="Legal Question"
         error={!!errors.description}
         helperText={errors.description}
         placeholder="Describe your legal question here. Our team will connect you with an appropriate legal expert."
       />

       <Box sx={{ display: 'flex', gap: 2 }}>
         <FormControl fullWidth error={!!errors.state}>
           <InputLabel>State/Country</InputLabel>
           <Select
             value={formData.state}
             onChange={handleChange('state')}
             label="State/Country"
           >
             <MenuItem value="">Select</MenuItem>
             <MenuItem value="AL">Alabama</MenuItem>
             <MenuItem value="AK">Alaska</MenuItem>
             <MenuItem value="AZ">Arizona</MenuItem>
             <MenuItem value="AR">Arkansas</MenuItem>
             <MenuItem value="CA">California</MenuItem>
             <MenuItem value="TX">Texas</MenuItem>
           </Select>
           {errors.state && (
             <FormHelperText>{errors.state}</FormHelperText>
           )}
         </FormControl>

         <FormControl fullWidth error={!!errors.caseType}>
           <InputLabel>Area of Law</InputLabel>
           <Select
             value={formData.caseType}
             onChange={handleChange('caseType')}
             label="Area of Law"
           >
             <MenuItem value="">Select</MenuItem>
             <MenuItem value="Immigration">Immigration Law</MenuItem>
             <MenuItem value="Family">Family Law</MenuItem>
             <MenuItem value="Criminal">Criminal Law</MenuItem>
             <MenuItem value="Civil">Civil Law</MenuItem>
             <MenuItem value="Business">Business Law</MenuItem>
           </Select>
           {errors.caseType && (
             <FormHelperText>{errors.caseType}</FormHelperText>
           )}
         </FormControl>
       </Box>

       <TextField
         value={formData.additionalInfo}
         onChange={handleChange('additionalInfo')}
         multiline
         rows={3}
         label="Additional Information"
         placeholder="Any additional details that might help with your case..."
       />

       <Typography variant="body2" color="text.secondary">
         Our team will review your question and connect you with an appropriate legal expert within 24 hours.
       </Typography>

       {error && (
         <Typography color="error">
           {error}
         </Typography>
       )}

       <Button
         type="submit"
         variant="contained"
         disabled={isLoading}
         sx={{
           bgcolor: '#c1666b',
           '&:hover': {
             bgcolor: '#a85c61',
           },
         }}
       >
         {isLoading ? 'Submitting...' : 'Submit Question'}
       </Button>
     </Box>
   </Paper>
 );
};

export default IntakeWizard;
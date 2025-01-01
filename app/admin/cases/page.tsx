'use client';

import {
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Chip,
    Grid,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {format} from 'date-fns';
import {useCases} from "@/app/hooks/useCases";
import {AdminRoute} from '@/app/components/AdminRoute';
import {useState} from 'react';

export default function CasesAdmin() {
    const {cases, loading, error, deleteCase} = useCases();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [caseToDelete, setCaseToDelete] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setCaseToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (caseToDelete) {
            try {
                await deleteCase(caseToDelete);
                setDeleteDialogOpen(false);
                setCaseToDelete(null);
            } catch (err) {
                setDeleteDialogOpen(false);
                setCaseToDelete(null);
                console.log("The error was: ", err);
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <AdminRoute>
            <Box p={4}>
                {error && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {error}
                    </Alert>
                )}

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
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
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
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDeleteClick(caseItem.id)}
                                            aria-label="delete case"
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Box>

                                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                        {format(new Date(caseItem.timestamp), 'PPp')}
                                    </Typography>

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

                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>Delete Case</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this case? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteConfirm} color="error" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </AdminRoute>
    );
}
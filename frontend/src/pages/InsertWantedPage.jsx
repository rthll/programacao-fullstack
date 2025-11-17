import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import WantedForm from '../components/WantedForm';

const InsertWantedPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 5 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Insert Wanted Person
        </Typography>
        <WantedForm />
      </Container>
    </Box>
  );
};

export default InsertWantedPage;
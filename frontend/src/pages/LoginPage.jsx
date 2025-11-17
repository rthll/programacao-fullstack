import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff', // fundo branco
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 3,
            boxShadow: 3,
            p: 5,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
            Login
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Acesse o sistema para visualizar os procurados pelo FBI.
          </Typography>

          <LoginForm />
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
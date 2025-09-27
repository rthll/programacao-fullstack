// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        py: 3,
        mt: 4,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          FBI Most Wanted
        </Typography>

        <Typography variant="body2" sx={{ color: '#999', mb: 2 }}>
          Sistema de busca e visualização de pessoas procuradas pelo FBI.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
          <Link 
            href="https://www.fbi.gov/wanted" 
            target="_blank"
            sx={{ color: '#999', '&:hover': { color: '#fff', textDecoration: 'underline' } }}
          >
            FBI.gov
          </Link>
          <Link 
            href="https://www.fbi.gov/tips" 
            target="_blank"
            sx={{ color: '#999', '&:hover': { color: '#fff', textDecoration: 'underline' } }}
          >
            Enviar Dica
          </Link>
          <Link 
            href="https://www.fbi.gov/about" 
            target="_blank"
            sx={{ color: '#999', '&:hover': { color: '#fff', textDecoration: 'underline' } }}
          >
            Sobre o FBI
          </Link>
        </Stack>

        <Typography variant="body2" sx={{ color: '#666' }}>
          © {currentYear} Desenvolvido por Rythielly Bezerra e Jhonathan Giacomazzi na disciplina de programação Fullstack
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

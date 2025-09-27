// src/components/Header.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { Warning } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>
          <Box 
            component={RouterLink} 
            to="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                opacity: 0.9,
                transition: 'opacity 0.2s',
              }
            }}
          >
            <Warning 
              sx={{ 
                fontSize: 32, 
                mr: 2, 
                color: '#fbbf24',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              }} 
            />
            <Box>
              <Typography 
                variant="h5" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                FBI Most Wanted
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.875rem',
                  mt: -0.5,
                }}
              >
                Sistema de Busca de Procurados
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import { Warning, Menu as MenuIcon } from '@mui/icons-material';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  const handleMenuClick = (action) => {
  setMenuOpen(false);
  switch (action) {
    case 'inserir':
      navigate('/inserir');
      break;
    case 'buscar':
      navigate('/buscar');
      break;
    case 'sair':
      handleLogout();
      break;
    default:
      break;
  }
};
  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, px: 0, justifyContent: 'space-between' }}>
            {/* Esquerda: Menu + Título */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {!isLoginPage && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setMenuOpen(true)}
                  sx={{ p: 1.5, fontSize: 36 }}
                >
                  <MenuIcon fontSize="inherit" />
                </IconButton>
              )}

              <Box
                component={RouterLink}
                to="/home"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  ml: !isLoginPage ? 2 : 0,
                  '&:hover': {
                    opacity: 0.9,
                    transition: 'opacity 0.2s',
                  },
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
            </Box>

            {/* Direita: Botão Sair */}
            {!isLoginPage && (
              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                }}
              >
                LOGOUT
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Menu lateral */}
      {!isLoginPage && (
        <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              <ListItem button onClick={() => handleMenuClick('inserir')}>
                <ListItemText primary="Inserir" />
              </ListItem>
              <ListItem button onClick={() => handleMenuClick('buscar')}>
                <ListItemText primary="Buscar" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => handleMenuClick('sair')}>
                <ListItemText primary="Sair" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Header;
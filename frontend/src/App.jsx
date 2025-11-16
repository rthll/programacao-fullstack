import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';

// IMPORTAR O PROVIDER
import { AppProvider } from './contexts/AppContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PersonDetail from './pages/PersonDetail';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    // ENVOLVER COM PROVIDER
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box 
            sx={{ 
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.default',
            }}
          >
            <Header />
            
            <Box component="main" sx={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/person/:id" element={<PersonDetail />} />
              </Routes>
            </Box>
            
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
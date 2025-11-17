import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import ProtectedRoute from './components/ProtectedRoute';
import { AppProvider } from './contexts/AppContext';
import InsertWantedPage from './pages/InsertWantedPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PersonDetail from './pages/PersonDetail';
import LoginPage from './pages/LoginPage';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
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
                <Route path="/" element={<LoginPage />} />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/person/:id"
                  element={
                    <ProtectedRoute>
                      <PersonDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/inserir"
                  element={
                    <ProtectedRoute>
                      <InsertWantedPage />
                    </ProtectedRoute>
                  }
                />
                
                
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
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Header from './components/Header';
import Home from './pages/Home';
import PersonDetail from './pages/PersonDetail';

// Importar fonte Roboto (opcional)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/person/:id" element={<PersonDetail />} />
            </Routes>
          </main>
          
          <footer style={{ 
            backgroundColor: '#1a1a1a', 
            color: 'white', 
            padding: '2rem 0', 
            marginTop: '3rem' 
          }}>
            <div style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              padding: '0 1rem', 
              textAlign: 'center' 
            }}>
              <p style={{ marginBottom: '0.5rem' }}>FBI Most Wanted App</p>
              <p style={{ 
                color: '#999', 
                fontSize: '0.875rem', 
                margin: 0 
              }}>
                Dados fornecidos pela API oficial do FBI
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
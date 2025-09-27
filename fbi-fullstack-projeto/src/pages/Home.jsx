import React, { useReducer, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Alert,
} from '@mui/material';
import { Person, Refresh } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import WantedCard from '../components/WantedCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockWantedPersons } from '../services/api';

// Estado inicial
const initialState = {
  persons: [],
  loading: false,
  error: null,
  searchTerm: ''
};

// Reducer simples
function appReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, persons: action.data };
    case 'ERROR':
      return { ...state, loading: false, error: action.message };
    case 'SEARCH':
      return { ...state, searchTerm: action.term };
    case 'CLEAR_SEARCH':
      return { ...state, searchTerm: '' };
    default:
      return state;
  }
}

const Home = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Carregar dados
  const loadData = async () => {
    dispatch({ type: 'LOADING' });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch({ type: 'SUCCESS', data: mockWantedPersons });
    } catch (error) {
      dispatch({ type: 'ERROR', message: 'Erro ao carregar dados' });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtrar pessoas
  const filteredPersons = state.persons.filter(person => {
    if (!state.searchTerm) return true;
    
    return (
      person.title?.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      person.subjects?.some(subject => 
        subject.toLowerCase().includes(state.searchTerm.toLowerCase())
      ) ||
      person.race?.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  });

  // Handlers
  const handleSearch = (term) => {
    dispatch({ type: 'SEARCH', term });
  };

  const handleClearSearch = () => {
    dispatch({ type: 'CLEAR_SEARCH' });
  };

  if (state.loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Cabeçalho */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
          Pessoas Procuradas pelo FBI
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {state.persons.length} pessoas atualmente na lista de procurados
        </Typography>

        {/* Erro */}
        {state.error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {state.error}
            <Button onClick={loadData} sx={{ ml: 2 }}>
              Tentar novamente
            </Button>
          </Alert>
        )}

        {/* Busca */}
        <SearchBar
          searchTerm={state.searchTerm}
          onSearchChange={handleSearch}
          onClear={handleClearSearch}
        />
      </Box>

      {/* Resultados */}
      {filteredPersons.length > 0 ? (
        <>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {state.searchTerm ? (
                <>Mostrando {filteredPersons.length} resultado(s) para "{state.searchTerm}"</>
              ) : (
                <>Mostrando todos os {filteredPersons.length} procurados</>
              )}
            </Typography>
            
            <Button
              variant="outlined"
              size="small"
              onClick={loadData}
              startIcon={<Refresh />}
            >
              Atualizar
            </Button>
          </Box>

          <Grid container spacing={3}>
            {filteredPersons.map(person => (
              <Grid item xs={12} sm={6} md={4} key={person.uid}>
                <WantedCard person={person} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Person sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            Nenhum resultado encontrado
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {state.searchTerm 
              ? 'Tente ajustar os termos de busca'
              : 'Nenhum dado disponível no momento'
            }
          </Typography>
          <Box>
            {state.searchTerm && (
              <Button
                variant="contained"
                onClick={handleClearSearch}
                sx={{ mr: 2 }}
              >
                Limpar Busca
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={loadData}
              startIcon={<Refresh />}
            >
              Tentar Novamente
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Home;
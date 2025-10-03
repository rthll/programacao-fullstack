import React, { useEffect } from 'react';
import { User } from 'lucide-react';
import { Alert, Button, Box, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import WantedCard from '../components/WantedCard';
import LoadingSpinner from '../components/LoadingSpinner';
import PersonDetailModal from '../components/PersonDetailModal';

// IMPORTAR CONTEXT E HOOK PERSONALIZADO
import { useAppContext } from '../contexts/AppContext';
import { useFBISearch } from '../hooks/useFBISearch';

const Home = () => {
  // USAR CONTEXT (substitui todos os useState)
  const {
    state,
    loadData,
    setSearch,
    clearSearch,
    setPage,
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useAppContext();

  const [selectedPerson, setSelectedPerson] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  // USAR HOOK PERSONALIZADO
  const filteredPersons = useFBISearch(state.persons, state.searchTerm);

  // Carregar dados ao montar
  useEffect(() => {
    loadData(1);
  }, []);

  // Recarregar quando página ou busca mudar
  useEffect(() => {
    loadData(state.page, state.searchTerm);
  }, [state.page, state.searchTerm]);

  if (state.loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8">
      <div className="mb-8">
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Pessoas Procuradas pelo FBI
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {state.total} pessoas encontradas
        </Typography>

        {state.favorites.length > 0 && (
          <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
            ⭐ {state.favorites.length} favorito(s)
          </Typography>
        )}

        {state.error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {state.error}
            <Button onClick={() => loadData(state.page)} sx={{ ml: 2 }}>
              Tentar novamente
            </Button>
          </Alert>
        )}

        <SearchBar
          searchTerm={state.searchTerm}
          onSearchChange={(term) => setSearch(term)}
          onClear={() => clearSearch()}
        />
      </div>

      {filteredPersons.length > 0 ? (
        <>
          <div className="mb-6 flex justify-between items-center">
            <div className="text-gray-600">
              {state.searchTerm ? (
                <p>Página {state.page} de resultados para "{state.searchTerm}"</p>
              ) : (
                <p>Página {state.page} da lista completa</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
            {filteredPersons.map(person => (
              <Box key={person.uid} sx={{ position: 'relative' }}>
                <WantedCard
                  person={person}
                  onViewDetails={() => {
                    setSelectedPerson(person);
                    setShowModal(true);
                  }}
                />
                <Button
                  size="small"
                  onClick={() => 
                    isFavorite(person.uid) 
                      ? removeFavorite(person.uid)
                      : addFavorite(person)
                  }
                  sx={{ mt: 1 }}
                >
                  {isFavorite(person.uid) ? '⭐ Favorito' : '☆ Favoritar'}
                </Button>
              </Box>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setPage(Math.max(state.page - 1, 1))}
              disabled={state.page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              ← Anterior
            </button>
            <span className="px-4 py-2 text-sm text-gray-600">
              Página {state.page} de {state.totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(state.page + 1, state.totalPages))}
              disabled={state.page === state.totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Próximo →
            </button>
          </div>

          {showModal && selectedPerson && (
            <PersonDetailModal
              person={selectedPerson}
              onClose={() => {
                setShowModal(false);
                setSelectedPerson(null);
              }}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum resultado encontrado
          </h3>
          <button
            onClick={() => clearSearch()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ver todos
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import {
  Alert,
  Button,
  Box,
  Typography,
} from '@mui/material';

import SearchBar from '../components/SearchBar';
import WantedCard from '../components/WantedCard';
import LoadingSpinner from '../components/LoadingSpinner';
import PersonDetailModal from '../components/PersonDetailModal';

import { useAppContext } from '../contexts/AppContext';

const Home = () => {
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

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredPersons = state.filteredPersons;

  useEffect(() => {
    loadData(); // carrega todos os dados da API local
  }, []);

  if (state.loading) return <LoadingSpinner />;

  return (
    <div className="w-full px-6 py-8">
      <div className="mb-8">
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Pessoas Procuradas
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
            <Button onClick={() => loadData()} sx={{ ml: 2 }}>
              Tentar novamente
            </Button>
          </Alert>
        )}

        <SearchBar
          searchTerm={state.searchTerm}
          onSearchChange={(term) => setSearch(term)}
          onClear={() => clearSearch()}
          inputProps={{ id: 'search-input' }}
        />
      </div>

      {filteredPersons.length > 0 ? (
        <>
          <div className="mb-6 flex justify-between items-center">
            <div className="text-gray-600">
              {state.searchTerm ? (
                <p>Resultados para "{state.searchTerm}"</p>
              ) : (
                <p>Lista completa</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
            {filteredPersons.map((person) => (
              <Box key={person._id?.$oid || person._id || person.uid} sx={{ position: 'relative' }}>
                <WantedCard
                  person={{
                    ...person,
                    image: person.image || person.images?.[0]?.original || null,
                  }}
                  onViewDetails={() => {
                    setSelectedPerson(person);
                    setShowModal(true);
                  }}
                />
               
              </Box>
            ))}
          </div>

          {showModal && selectedPerson && (
            <PersonDetailModal
              person={{
                ...selectedPerson,
                image: selectedPerson.image || selectedPerson.images?.[0]?.original || null,
              }}
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
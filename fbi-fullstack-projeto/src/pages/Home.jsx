import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { Alert, Button } from '@mui/material';
import SearchBar from '../components/SearchBar';
import WantedCard from '../components/WantedCard';
import LoadingSpinner from '../components/LoadingSpinner';
import PersonDetailModal from '../components/PersonDetailModal';
import { fbiAPI } from '../services/api';

const Home = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = searchTerm.trim()
        ? await fbiAPI.searchWanted(searchTerm, page)
        : await fbiAPI.getWantedList(page);

      setPersons(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(Math.ceil(data.total / (data.items?.length || 1)));
    } catch (err) {
      setError('Erro ao carregar dados. Tente novamente.');
      setPersons([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, page]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPersons(persons);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = persons.filter(person =>
        person.title?.toLowerCase().includes(term) ||
        person.subjects?.some(subject => subject.toLowerCase().includes(term)) ||
        person.race?.toLowerCase().includes(term) ||
        person.hair?.toLowerCase().includes(term) ||
        person.sex?.toLowerCase().includes(term) ||
        person.eyes?.toLowerCase().includes(term) ||
        person.nationality?.toLowerCase().includes(term) ||
        person.place_of_birth?.toLowerCase().includes(term) ||
        person.details?.toLowerCase().includes(term)
      );
      setFilteredPersons(filtered);
    }
  }, [persons, searchTerm]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Pessoas Procuradas pelo FBI
        </h2>
        <p className="text-gray-600 mb-6">
          {total} pessoas encontradas
        </p>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
            <Button onClick={loadData} sx={{ ml: 2 }}>
              Tentar novamente
            </Button>
          </Alert>
        )}

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(term) => {
            setSearchTerm(term);
            setPage(1);
          }}
          onClear={() => {
            setSearchTerm('');
            setPage(1);
          }}
        />
      </div>

      {filteredPersons.length > 0 ? (
        <>
          <div className="mb-6 flex justify-between items-center">
            <div className="text-gray-600">
              {searchTerm ? (
                <p>Mostrando página {page} de resultados para "{searchTerm}"</p>
              ) : (
                <p>Mostrando página {page} da lista completa</p>
              )}
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Limpar busca
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
            {filteredPersons.map(person => (
              <WantedCard
                key={person.uid}
                person={person}
                onViewDetails={() => {
                  setSelectedPerson(person);
                  setShowModal(true);
                }}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              ← Anterior
            </button>
            <span className="px-4 py-2 text-sm text-gray-600">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
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
          <p className="text-gray-500 mb-4">
            Tente ajustar os termos de busca
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setPage(1);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Ver todos os procurados
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import WantedCard from '../components/WantedCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fbiAPI, mockWantedPersons } from '../services/api';

const Home = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [error, setError] = useState(null);

  // Carrega dados da API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Para desenvolvimento, use mock data
        // Para produção, descomente a linha abaixo:
        // const data = await fbiAPI.getWantedList();
        // setPersons(data.items || []);
        
        // Simulando delay da API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPersons(mockWantedPersons);
        
      } catch (err) {
        setError('Erro ao carregar dados. Tente novamente.');
        console.error('Erro:', err);
        // Em caso de erro, use dados mock como fallback
        setPersons(mockWantedPersons);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtro de busca
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPersons(persons);
    } else {
      const filtered = persons.filter(person =>
        person.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.subjects?.some(subject => 
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        person.race?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.hair?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.nationality?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPersons(filtered);
    }
  }, [persons, searchTerm]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Pessoas Procuradas pelo FBI
        </h2>
        <p className="text-gray-600 mb-6">
          {persons.length} pessoas atualmente na lista de procurados
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={() => setSearchTerm('')}
        />
      </div>

      {filteredPersons.length > 0 ? (
        <>
          <div className="mb-6 flex justify-between items-center">
            <div className="text-gray-600">
              {searchTerm ? (
                <p>Mostrando {filteredPersons.length} resultado(s) para "{searchTerm}"</p>
              ) : (
                <p>Mostrando todos os {filteredPersons.length} procurados</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersons.map(person => (
              <WantedCard key={person.uid} person={person} />
            ))}
          </div>
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
            onClick={() => setSearchTerm('')}
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
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, User, Calendar, MapPin } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { fbiAPI, mockWantedPersons } from '../services/api';

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      setLoading(true);
      setError(null);
      
      try {

        const data = await fbiAPI.getPersonByUID(id);
        setPerson(data.items?.[0] || null);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundPerson = mockWantedPersons.find(p => p.uid === id);
        setPerson(foundPerson);
        
      } catch (err) {
        setError('Erro ao carregar dados da pessoa.');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !person) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar à lista
        </Link>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Pessoa não encontrada'}
          </h2>
          <p className="text-gray-600">
            A pessoa procurada não foi encontrada ou ocorreu um erro.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar à lista
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={person.images?.[0]?.original || "https://via.placeholder.com/400x500?text=Foto+Indisponível"}
              alt={person.title}
              className="w-full h-96 md:h-full object-cover"
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{person.title}</h1>
            
            {person.warning_message && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  <strong>AVISO: {person.warning_message}</strong>
                </div>
              </div>
            )}

            {person.reward_text && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
                <strong>{person.reward_text}</strong>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                  Informações Pessoais
                </h3>
                <div className="space-y-2 text-sm">
                  {person.sex && <div><strong>Sexo:</strong> {person.sex}</div>}
                  {person.race && <div><strong>Raça:</strong> {person.race}</div>}
                  {person.age_range && <div><strong>Idade:</strong> {person.age_range}</div>}
                  {person.height_min && <div><strong>Altura:</strong> {person.height_min}</div>}
                  {person.weight && <div><strong>Peso:</strong> {person.weight}</div>}
                  {person.hair && <div><strong>Cabelo:</strong> {person.hair}</div>}
                  {person.eyes && <div><strong>Olhos:</strong> {person.eyes}</div>}
                  {person.nationality && <div><strong>Nacionalidade:</strong> {person.nationality}</div>}
                  {person.place_of_birth && <div><strong>Local de Nascimento:</strong> {person.place_of_birth}</div>}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                  Crimes
                </h3>
                {person.subjects && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {person.subjects.map((subject, idx) => (
                      <span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                )}
                
                {person.dates_of_birth_used && (
                  <div>
                    <strong>Datas de Nascimento Usadas:</strong>
                    <ul className="list-disc list-inside mt-1 text-sm">
                      {person.dates_of_birth_used.map((date, idx) => (
                        <li key={idx}>{new Date(date).toLocaleDateString('pt-BR')}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {person.details && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                  Detalhes
                </h3>
                <p className="text-gray-700 leading-relaxed">{person.details}</p>
              </div>
            )}

            <div className="bg-gray-100 p-4 rounded">
              <p className="text-sm text-gray-600">
                <strong>Importante:</strong> Se você tiver informações sobre esta pessoa, 
                entre em contato com as autoridades locais ou FBI imediatamente. 
                <strong> Não tente abordar.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetail;
const PersonDetailModal = ({ person, onClose }) => {
  if (!person) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{person.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="md:flex gap-6">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img
                src={person.images?.[0]?.original || "https://via.placeholder.com/400x500?text=Foto+Indisponível"}
                alt={person.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-2/3">
              {person.warning_message && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                  <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <strong>AVISO: {person.warning_message}</strong>
                  </div>
                </div>
              )}

              {person.reward_text && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
                  <strong>💰 {person.reward_text}</strong>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Informações Pessoais</h3>
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Crimes</h3>
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
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">Detalhes</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{person.details}</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t">
                <p className="text-xs text-gray-500">
                  <strong>Importante:</strong> Se você tiver informações sobre esta pessoa, entre em contato com as autoridades locais ou FBI imediatamente. Não tente abordar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

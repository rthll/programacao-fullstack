const PersonDetailModal = ({ person, onClose }) => {
  if (!person) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{person.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          <div className="md:flex gap-4">
            <div className="md:w-1/3 mb-4 md:mb-0">
              <img
                src={person.images?.[0]?.original || "https://via.placeholder.com/400x500?text=Foto+Indisponível"}
                alt={person.title}
                className="w-full rounded-lg shadow"
              />
            </div>

            <div className="md:w-2/3">
              {person.warning_message && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded text-sm">
                  <strong>⚠️ {person.warning_message}</strong>
                </div>
              )}

              {person.reward_text && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mb-4 rounded text-sm">
                  <strong>💰 {person.reward_text}</strong>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2 border-b pb-1">Informações Pessoais</h3>
                  <div className="space-y-1">
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
                  <h3 className="text-base font-semibold text-gray-800 mb-2 border-b pb-1">Crimes</h3>
                  {person.subjects && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {person.subjects.map((subject, idx) => (
                        <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                          {subject}
                        </span>
                      ))}
                    </div>
                  )}
                  {person.dates_of_birth_used && (
                    <div>
                      <strong>Datas de Nascimento Usadas:</strong>
                      <ul className="list-disc list-inside mt-1 text-xs">
                        {person.dates_of_birth_used.map((date, idx) => (
                          <li key={idx}>{new Date(date).toLocaleDateString('pt-BR')}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {person.details && (
                <div className="mb-4">
                  <h3 className="text-base font-semibold text-gray-800 mb-2 border-b pb-1">Detalhes</h3>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {person.details}
                  </p>
                </div>
              )}

              <div className="pt-3 border-t text-xs text-gray-500">
                <strong>Importante:</strong> Se você tiver informações sobre esta pessoa, entre em contato com as autoridades locais ou com o FBI. Não tente abordar.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailModal;
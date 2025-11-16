import React, { useState } from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onSubmit, onClear }) => {
  const [input, setInput] = useState(searchTerm);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange(input);
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Buscar por nome, crime ou característica"
        className="flex-grow px-4 py-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Buscar
      </button>
      {searchTerm && (
        <button type="button" onClick={onClear} className="text-sm text-gray-500 hover:text-gray-700">
          Limpar
        </button>
      )}
    </form>
  );
};

export default SearchBar;
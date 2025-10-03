import { useState, useEffect } from 'react';

export const useFBISearch = (persons, searchTerm) => {
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPersons(persons);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = persons.filter(person =>
        person.title?.toLowerCase().includes(term) ||
        person.subjects?.some(s => s.toLowerCase().includes(term)) ||
        person.race?.toLowerCase().includes(term) ||
        person.hair?.toLowerCase().includes(term) ||
        person.sex?.toLowerCase().includes(term) ||
        person.eyes?.toLowerCase().includes(term) ||
        person.nationality?.toLowerCase().includes(term) ||
        person.place_of_birth?.toLowerCase().includes(term)
      );
      setFilteredPersons(filtered);
    }
  }, [persons, searchTerm]);

  return filteredPersons;
};
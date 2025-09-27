import { useReducer, useCallback } from 'react';
import { mockWantedPersons } from '../services/api';

// Estado inicial
const initialState = {
  persons: [],
  filteredPersons: [],
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    sex: '',
    race: '',
    subjects: [],
  },
  favorites: [],
  selectedPerson: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0
  }
};

// Tipos de ações
export const ACTION_TYPES = {
  // Loading e dados
  SET_LOADING: 'SET_LOADING',
  SET_PERSONS: 'SET_PERSONS',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  // Busca e filtros
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  CLEAR_SEARCH: 'CLEAR_SEARCH',
  SET_FILTER: 'SET_FILTER',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  
  // Favoritos
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  LOAD_FAVORITES: 'LOAD_FAVORITES',
  
  // Pessoa selecionada
  SET_SELECTED_PERSON: 'SET_SELECTED_PERSON',
  CLEAR_SELECTED_PERSON: 'CLEAR_SELECTED_PERSON',
  
  // Paginação
  SET_PAGE: 'SET_PAGE',
  SET_PAGINATION: 'SET_PAGINATION',
};

// Função para aplicar filtros
const applyFilters = (persons, searchTerm, filters) => {
  let filtered = [...persons];

  // Filtro por termo de busca
  if (searchTerm.trim()) {
    filtered = filtered.filter(person =>
      person.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.subjects?.some(subject => 
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      person.race?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.hair?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.nationality?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filtro por sexo
  if (filters.sex) {
    filtered = filtered.filter(person => 
      person.sex?.toLowerCase() === filters.sex.toLowerCase()
    );
  }

  // Filtro por raça
  if (filters.race) {
    filtered = filtered.filter(person => 
      person.race?.toLowerCase().includes(filters.race.toLowerCase())
    );
  }

  // Filtro por crimes
  if (filters.subjects.length > 0) {
    filtered = filtered.filter(person =>
      person.subjects?.some(subject =>
        filters.subjects.includes(subject)
      )
    );
  }

  return filtered;
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ACTION_TYPES.SET_PERSONS:
      const filteredPersons = applyFilters(action.payload, state.searchTerm, state.filters);
      return {
        ...state,
        persons: action.payload,
        filteredPersons,
        loading: false,
        error: null,
        pagination: {
          ...state.pagination,
          total: filteredPersons.length,
        }
      };

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case ACTION_TYPES.SET_SEARCH_TERM:
      const searchFiltered = applyFilters(state.persons, action.payload, state.filters);
      return {
        ...state,
        searchTerm: action.payload,
        filteredPersons: searchFiltered,
        pagination: {
          ...state.pagination,
          page: 1, 
          total: searchFiltered.length,
        }
      };

    case ACTION_TYPES.CLEAR_SEARCH:
      const clearedFiltered = applyFilters(state.persons, '', state.filters);
      return {
        ...state,
        searchTerm: '',
        filteredPersons: clearedFiltered,
        pagination: {
          ...state.pagination,
          page: 1,
          total: clearedFiltered.length,
        }
      };

    case ACTION_TYPES.SET_FILTER:
      const newFilters = {
        ...state.filters,
        [action.payload.key]: action.payload.value,
      };
      const filterFiltered = applyFilters(state.persons, state.searchTerm, newFilters);
      return {
        ...state,
        filters: newFilters,
        filteredPersons: filterFiltered,
        pagination: {
          ...state.pagination,
          page: 1,
          total: filterFiltered.length,
        }
      };

    case ACTION_TYPES.CLEAR_FILTERS:
      const noFiltersFiltered = applyFilters(state.persons, state.searchTerm, {
        sex: '',
        race: '',
        subjects: [],
      });
      return {
        ...state,
        filters: {
          sex: '',
          race: '',
          subjects: [],
        },
        filteredPersons: noFiltersFiltered,
        pagination: {
          ...state.pagination,
          page: 1,
          total: noFiltersFiltered.length,
        }
      };

    case ACTION_TYPES.ADD_FAVORITE:
      if (state.favorites.find(fav => fav.uid === action.payload.uid)) {
        return state; 
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case ACTION_TYPES.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(fav => fav.uid !== action.payload),
      };

    case ACTION_TYPES.LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };

    case ACTION_TYPES.SET_SELECTED_PERSON:
      return {
        ...state,
        selectedPerson: action.payload,
      };

    case ACTION_TYPES.CLEAR_SELECTED_PERSON:
      return {
        ...state,
        selectedPerson: null,
      };

    case ACTION_TYPES.SET_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload,
        }
      };

    case ACTION_TYPES.SET_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        }
      };

    default:
      return state;
  }
};

// Hook personalizado que usa useReducer
export const useAppState = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators 
  const actions = {
    setLoading: useCallback((loading) => {
      dispatch({ type: ACTION_TYPES.SET_LOADING, payload: loading });
    }, []),

    setPersons: useCallback((persons) => {
      dispatch({ type: ACTION_TYPES.SET_PERSONS, payload: persons });
    }, []),

    setError: useCallback((error) => {
      dispatch({ type: ACTION_TYPES.SET_ERROR, payload: error });
    }, []),

    clearError: useCallback(() => {
      dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
    }, []),

    setSearchTerm: useCallback((term) => {
      dispatch({ type: ACTION_TYPES.SET_SEARCH_TERM, payload: term });
    }, []),

    clearSearch: useCallback(() => {
      dispatch({ type: ACTION_TYPES.CLEAR_SEARCH });
    }, []),

    setFilter: useCallback((key, value) => {
      dispatch({ type: ACTION_TYPES.SET_FILTER, payload: { key, value } });
    }, []),

    clearFilters: useCallback(() => {
      dispatch({ type: ACTION_TYPES.CLEAR_FILTERS });
    }, []),

    addFavorite: useCallback((person) => {
      dispatch({ type: ACTION_TYPES.ADD_FAVORITE, payload: person });
    }, []),

    removeFavorite: useCallback((uid) => {
      dispatch({ type: ACTION_TYPES.REMOVE_FAVORITE, payload: uid });
    }, []),

    loadFavorites: useCallback((favorites) => {
      dispatch({ type: ACTION_TYPES.LOAD_FAVORITES, payload: favorites });
    }, []),

    setSelectedPerson: useCallback((person) => {
      dispatch({ type: ACTION_TYPES.SET_SELECTED_PERSON, payload: person });
    }, []),

    clearSelectedPerson: useCallback(() => {
      dispatch({ type: ACTION_TYPES.CLEAR_SELECTED_PERSON });
    }, []),

    setPage: useCallback((page) => {
      dispatch({ type: ACTION_TYPES.SET_PAGE, payload: page });
    }, []),

    // Função composta para carregar dados
    loadData: useCallback(async () => {
      try {
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: true });
        dispatch({ type: ACTION_TYPES.CLEAR_ERROR });

        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Usar mock data (substitua pela API real)
        dispatch({ type: ACTION_TYPES.SET_PERSONS, payload: mockWantedPersons });
        
        // Para API real:
        // const data = await fbiAPI.getWantedList();
        // dispatch({ type: ACTION_TYPES.SET_PERSONS, payload: data.items || [] });

      } catch (error) {
        dispatch({ type: ACTION_TYPES.SET_ERROR, payload: 'Erro ao carregar dados' });
        dispatch({ type: ACTION_TYPES.SET_PERSONS, payload: mockWantedPersons });
      }
    }, []),
  };


  const computed = {
    hasSearch: state.searchTerm.length > 0,
    hasFilters: state.filters.sex || state.filters.race || state.filters.subjects.length > 0,
    resultsCount: state.filteredPersons.length,
    totalPages: Math.ceil(state.filteredPersons.length / state.pagination.limit),
    currentPageItems: state.filteredPersons.slice(
      (state.pagination.page - 1) * state.pagination.limit,
      state.pagination.page * state.pagination.limit
    ),
    isFavorite: useCallback((uid) => {
      return state.favorites.some(fav => fav.uid === uid);
    }, [state.favorites]),
  };

  return {
    state,
    actions,
    computed,
  };
};

// Context para compartilhar estado globalmente (opcional)
import { createContext, useContext } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
  const appState = useAppState();
  
  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppStateProvider');
  }
  return context;
};
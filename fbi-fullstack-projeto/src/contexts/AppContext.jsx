import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { fbiAPI } from '../services/api';

// CRIAR CONTEXT
const AppContext = createContext(undefined);

// ESTADO INICIAL
const initialState = {
  persons: [],
  filteredPersons: [],
  loading: false,
  error: null,
  searchTerm: '',
  page: 1,
  total: 0,
  totalPages: 1,
  favorites: [],
};

// REDUCER
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };

    case 'SET_DATA':
      return {
        ...state,
        loading: false,
        persons: action.payload.items || [],
        filteredPersons: action.payload.items || [],
        total: action.payload.total || 0,
        totalPages: Math.ceil((action.payload.total || 0) / (action.payload.items?.length || 1)),
      };

    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload, page: 1 };

    case 'CLEAR_SEARCH':
      return { ...state, searchTerm: '', page: 1 };

    case 'SET_PAGE':
      return { ...state, page: action.payload };

    case 'SET_FILTERED':
      return { ...state, filteredPersons: action.payload };

    case 'ADD_FAVORITE':
      const newFavs = [...state.favorites, action.payload];
      localStorage.setItem('fbi-favorites', JSON.stringify(newFavs));
      return { ...state, favorites: newFavs };

    case 'REMOVE_FAVORITE':
      const filtered = state.favorites.filter(f => f.uid !== action.payload);
      localStorage.setItem('fbi-favorites', JSON.stringify(filtered));
      return { ...state, favorites: filtered };

    case 'LOAD_FAVORITES':
      return { ...state, favorites: action.payload };

    default:
      return state;
  }
};

// PROVIDER
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Carregar favoritos ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem('fbi-favorites');
    if (saved) {
      dispatch({ type: 'LOAD_FAVORITES', payload: JSON.parse(saved) });
    }
  }, []);

  // ACTIONS
  const loadData = useCallback(async (page = 1, searchTerm = '') => {
    dispatch({ type: 'SET_LOADING' });

    try {
      const data = searchTerm.trim()
        ? await fbiAPI.searchWanted(searchTerm, page)
        : await fbiAPI.getWantedList(page);

      dispatch({ type: 'SET_DATA', payload: data });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Erro ao carregar dados' });
    }
  }, []);

  const setSearch = useCallback((term) => {
    dispatch({ type: 'SET_SEARCH', payload: term });
  }, []);

  const clearSearch = useCallback(() => {
    dispatch({ type: 'CLEAR_SEARCH' });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  }, []);

  const addFavorite = useCallback((person) => {
    if (!state.favorites.find(f => f.uid === person.uid)) {
      dispatch({ type: 'ADD_FAVORITE', payload: person });
    }
  }, [state.favorites]);

  const removeFavorite = useCallback((uid) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: uid });
  }, []);

  const isFavorite = useCallback((uid) => {
    return state.favorites.some(f => f.uid === uid);
  }, [state.favorites]);

  const value = {
    state,
    loadData,
    setSearch,
    clearSearch,
    setPage,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// HOOK CUSTOMIZADO
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de AppProvider');
  }
  return context;
};
import axios from 'axios';

const API_BASE_URL = 'https://api.fbi.gov/wanted/v1';

export const fbiAPI = {
  getWantedList: async (page = 1) => {
    const response = await axios.get(`${API_BASE_URL}/list`, {
      params: { page, sort_on: 'modified', sort_order: 'desc' },
    });
    return response.data;
  },

  searchWanted: async (query, page = 1) => {
  const fields = ['title', 'subjects', 'hair', 'eyes', 'race', 'sex', 'nationality', 'place_of_birth'];
  const results = new Map();

  for (const field of fields) {
    try {
      const response = await axios.get(`${API_BASE_URL}/list`, {
        params: {
          page,
          [field]: query,
        },
      });

      response.data.items?.forEach(item => {
        results.set(item.uid, item); 
      });
    } catch (error) {
      console.warn(`Erro ao buscar por ${field}:`, error.message);
    }
  }

  return {
    items: Array.from(results.values()),
    total: results.size,
  };
},

  getPersonByUID: async (uid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list`, {
        params: { uid },
      });
      return response.data.items?.[0] || null;
    } catch (error) {
      console.error('Erro ao buscar pessoa por UID:', error);
      throw error;
    }
  },
};
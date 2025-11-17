import axios from 'axios';

const LOCAL_BASE_URL = 'http://localhost:3001/api/data';

export const fbiAPI = {
  getWantedList: async () => {
    const response = await axios.get(`${LOCAL_BASE_URL}/search`);
    return {
      items: response.data,
      total: response.data.length,
    };
  },

  searchWanted: async (query) => {
    const response = await axios.get(`${LOCAL_BASE_URL}/search`);
    const filtered = response.data.filter(p =>
      p.title?.toLowerCase().includes(query.toLowerCase())
    );
    return {
      items: filtered,
      total: filtered.length,
    };
  },

  getPersonByUID: async (uid) => {
    const response = await axios.get(`${LOCAL_BASE_URL}/search`);
    return response.data.find(p => p.uid === uid) || null;
  },
};
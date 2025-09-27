import axios from 'axios';

const API_BASE_URL = 'https://api.fbi.gov/wanted/v1';

export const fbiAPI = {
  // Buscar todos os procurados
  getWantedList: async (page = 1) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list`, {
        params: {
          page: page,
          sort_on: 'modified',
          sort_order: 'desc'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar lista:', error);
      throw error;
    }
  },

  // Buscar pessoa específica por UID
  getPersonByUID: async (uid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list`, {
        params: { uid }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pessoa:', error);
      throw error;
    }
  },

  // Buscar com filtros
  searchWanted: async (searchParams) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/list`, {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      console.error('Erro na busca:', error);
      throw error;
    }
  }
};

// Mock data criado somente para desenvolvimento
export const mockWantedPersons = [
  {
    uid: "1",
    title: "John Doe",
    images: [{ original: "https://via.placeholder.com/300x400?text=Photo+Not+Available" }],
    subjects: ["Murder", "Armed Robbery"],
    race: "White",
    sex: "Male",
    age_range: "35-40",
    hair: "Brown",
    eyes: "Blue",
    height_min: "5'10\"",
    weight: "180 lbs",
    nationality: "American",
    place_of_birth: "New York, NY",
    dates_of_birth_used: ["1983-05-15"],
    warning_message: "ARMED AND EXTREMELY DANGEROUS",
    details: "Wanted for multiple armed robberies and a murder in the downtown area. Last seen driving a blue sedan.",
    reward_text: "$50,000 reward offered"
  },
  {
    uid: "2",
    title: "Jane Smith",
    images: [{ original: "https://via.placeholder.com/300x400?text=Photo+Not+Available" }],
    subjects: ["Fraud", "Identity Theft"],
    race: "Hispanic",
    sex: "Female",
    age_range: "28-35",
    hair: "Black",
    eyes: "Brown",
    height_min: "5'4\"",
    weight: "140 lbs",
    nationality: "American",
    place_of_birth: "Los Angeles, CA",
    dates_of_birth_used: ["1988-12-03"],
    warning_message: "",
    details: "Wanted for large-scale identity theft operations affecting over 200 victims.",
    reward_text: "$25,000 reward offered"
  },
  {
    uid: "3",
    title: "Robert Johnson",
    images: [{ original: "https://via.placeholder.com/300x400?text=Photo+Not+Available" }],
    subjects: ["Drug Trafficking", "Money Laundering"],
    race: "Black",
    sex: "Male",
    age_range: "40-45",
    hair: "Bald",
    eyes: "Brown",
    height_min: "6'2\"",
    weight: "220 lbs",
    nationality: "American",
    place_of_birth: "Chicago, IL",
    dates_of_birth_used: ["1978-08-20"],
    warning_message: "CONSIDERED ARMED AND DANGEROUS",
    details: "Leader of a major drug trafficking organization. Has connections across multiple states.",
    reward_text: "$100,000 reward offered"
  }
];
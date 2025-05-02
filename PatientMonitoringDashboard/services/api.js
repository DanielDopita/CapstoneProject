// Configuration
const API_CONFIG = {
    mockMode: true,
    endpoints: {
      patients: {
        mock: 'https://mocki.io/v1/d9d138d5-3f7d-490a-8d2d-cf14454db997',
        prod: 'https://your-sharepoint-api/patients'
      },
      nurses: {
        mock: 'https://mocki.io/v1/e3d2b80e-6c4d-4174-a601-dd0b9bcee6cc',
        prod: 'https://your-sharepoint-api/nurses'
      }
    }
  };
  
  // Enhanced fetch with timeout
  const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
  
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error (${url}):`, error);
      if (API_CONFIG.mockMode) {
        return { patients: [], nurses: [] }; // Mock fallback
      }
      throw error;
    }
  };
  
  // API Service
  const ApiService = {
    getPatients: async () => {
      const url = API_CONFIG.mockMode 
        ? API_CONFIG.endpoints.patients.mock
        : API_CONFIG.endpoints.patients.prod;
      return fetchWithTimeout(url);
    },
    
    getNurses: async () => {
      const url = API_CONFIG.mockMode 
        ? API_CONFIG.endpoints.nurses.mock
        : API_CONFIG.endpoints.nurses.prod;
      return fetchWithTimeout(url);
    }
  };
  
  export default ApiService;
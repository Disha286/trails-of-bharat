import api from './authService';

/**
 * Fetch destinations with optional filters.
 * @param {Object} filters - Query parameters (category, state, q, budget)
 * @returns {Promise<Array>} List of destinations
 */
export const getDestinations = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== 'all') params.append('category', filters.category);
  if (filters.state && filters.state !== 'All States') params.append('state', filters.state);
  if (filters.q) params.append('q', filters.q);
  if (filters.budget && filters.budget !== 'all') params.append('budget', filters.budget);

  const response = await api.get('/destinations', { params });
  return response.data.data; // FastAPI returns { count, data: [...] }
};

/**
 * Fetch a single destination by ID.
 * @param {string} id
 * @returns {Promise<Object>} Destination details
 */
export const getDestinationById = async (id) => {
  const response = await api.get(`/destinations/${id}`);
  return response.data;
};

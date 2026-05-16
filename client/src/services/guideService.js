import api from './authService';

/**
 * Fetch guides with optional filters.
 * @param {Object} filters - Query parameters (state, q)
 * @returns {Promise<Array>} List of guides
 */
export const getGuides = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.state && filters.state !== 'All States') params.append('state', filters.state);
  if (filters.q) params.append('q', filters.q);

  const response = await api.get('/guides', { params });
  return response.data.data;
};

/**
 * Fetch a single guide by ID.
 * @param {string} id
 * @returns {Promise<Object>} Guide details
 */
export const getGuideById = async (id) => {
  const response = await api.get(`/guides/${id}`);
  return response.data;
};

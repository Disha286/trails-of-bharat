import api from './authService';

/**
 * Fetch products with optional filters.
 * @param {Object} filters - Query parameters (category, state, q, min_price, max_price)
 * @returns {Promise<Array>} List of products
 */
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== 'All') params.append('category', filters.category);
  if (filters.state) params.append('state', filters.state);
  if (filters.q) params.append('q', filters.q);

  const response = await api.get('/products', { params });
  return response.data.data;
};

/**
 * Fetch a single product by ID.
 * @param {number|string} id
 * @returns {Promise<Object>} Product details
 */
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

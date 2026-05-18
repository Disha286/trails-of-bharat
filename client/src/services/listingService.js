import api from './authService';

export const getListings = async (category = 'All') => {
  const params = {};
  if (category && category !== 'All') {
    params.category = category;
  }
  const response = await api.get('/listings', { params });
  return response.data.data;
};

export const getVendorListings = async () => {
  const response = await api.get('/listings/my-listings');
  return response.data;
};

export const createListing = async (data) => {
  const response = await api.post('/listings', data);
  return response.data;
};

export const deleteListing = async (id) => {
  const response = await api.delete(`/listings/${id}`);
  return response.data;
};

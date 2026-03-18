import axios from 'axios'

// Pointing exclusively to Render API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://geo-bd-apis.onrender.com/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const hubAPI = {
  // Divisions
  getDivisions: () => api.get('/divisions'),
  getDivision: (id) => api.get(`/divisions/${id}`),
  getDivisionWithDistricts: (id) => api.get(`/divisions/${id}/districts`),
  
  // Districts
  getDistricts: (divisionId) => api.get('/districts', { params: { division_id: divisionId } }),
  getDistrict: (id) => api.get(`/districts/${id}`),
  searchDistricts: (query) => api.get('/districts/search', { params: { q: query } }),
  
  // Upazilas
  getUpazilas: (districtId) => api.get('/upazilas', { params: { district_id: districtId } }),
  getUpazila: (id) => api.get(`/upazilas/${id}`),
  searchUpazilas: (query) => api.get('/upazilas/search', { params: { q: query } }),

  // Unions
  getUnions: (upazilaId) => api.get('/unions', { params: { upazila_id: upazilaId } }),
  getUnion: (id) => api.get(`/unions/${id}`),

  // GI Products
  getGIProducts: () => api.get('/giproducts'),
  getGIProduct: (id) => api.get(`/giproducts/${id}`),

  // World Bank Data
  getWorldBankIndicators: () => api.get('/worldbank'),
  getWorldBankIndicator: (code) => api.get(`/worldbank/${code}`),

  // WHO Health Data
  getWHOIndicators: () => api.get('/who'),
  getWHOIndicator: (uuid) => api.get(`/who/${uuid}`),
}

export default api

import axios from 'axios';

// Configuration API pour différents environnements
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://kushtati-immo-api.onrender.com/api';

// Instance axios avec configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important pour les cookies JWT
});

// Intercepteur: ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur: gérer les erreurs 401 (token expiré)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  role: 'owner' | 'tenant';
  created_at?: string;
}

export interface Property {
  id: number;
  owner_id: number;
  title: string;
  description?: string;
  location: string;
  price: number;
  type: 'Sale' | 'Rent';
  beds?: number;
  baths?: number;
  sqft?: number;
  image_url?: string;
  status: 'available' | 'rented' | 'sold';
  created_at?: string;
  owner_name?: string;
  owner_email?: string;
  owner_phone?: string;
}

export interface Payment {
  id: number;
  contract_id: number;
  tenant_id: number;
  amount: number;
  payment_date: string;
  payment_method: string;
  status: 'Payé' | 'En Attente' | 'En Retard' | 'Annulé';
  transaction_id?: string;
  notes?: string;
  property_title?: string;
  tenant_name?: string;
}

// Authentication API
export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role: 'owner' | 'tenant';
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data.user;
  },
};

// Properties API
export const propertiesAPI = {
  getAll: async (filters?: {
    type?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
  }): Promise<Property[]> => {
    const response = await api.get('/properties', { params: filters });
    return response.data.properties;
  },

  getOne: async (id: number): Promise<Property> => {
    const response = await api.get(`/properties/${id}`);
    return response.data.property;
  },

  create: async (formData: FormData) => {
    const response = await api.post('/properties', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id: number, formData: FormData) => {
    const response = await api.put(`/properties/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },

  getOwnerProperties: async (ownerId: number): Promise<Property[]> => {
    const response = await api.get(`/properties/owner/${ownerId}`);
    return response.data.properties;
  },
};

// Payments API
export const paymentsAPI = {
  getAll: async (): Promise<Payment[]> => {
    const response = await api.get('/payments');
    return response.data.payments;
  },

  getOne: async (id: number): Promise<Payment> => {
    const response = await api.get(`/payments/${id}`);
    return response.data.payment;
  },

  getByContract: async (contractId: number): Promise<Payment[]> => {
    const response = await api.get(`/payments/contract/${contractId}`);
    return response.data.payments;
  },

  create: async (data: {
    contract_id: number;
    amount: number;
    payment_date?: string;
    payment_method: string;
    status?: string;
    transaction_id?: string;
    notes?: string;
  }) => {
    const response = await api.post('/payments', data);
    return response.data;
  },

  update: async (
    id: number,
    data: {
      status?: string;
      transaction_id?: string;
      notes?: string;
    }
  ) => {
    const response = await api.put(`/payments/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/payments/${id}`);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data.users;
  },

  getOne: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data.user;
  },

  update: async (
    id: number,
    data: {
      name?: string;
      phone?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
    }
  ) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  getOwners: async (): Promise<User[]> => {
    const response = await api.get('/users/owners/list');
    return response.data.owners;
  },

  getTenants: async (): Promise<User[]> => {
    const response = await api.get('/users/tenants/list');
    return response.data.tenants;
  },
};

export default api;

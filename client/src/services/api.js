import axios from 'axios';

const BASE = import.meta.env.VITE_API_URL || 'https://carrer-ai-mken.onrender.com';

const api = axios.create({ baseURL: BASE, withCredentials: true });

// ── Token injection ──────────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auto-refresh on 401 ──────────────────────────────────────────
let isRefreshing = false;
let queue = [];

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${BASE}/api/auth/refresh`, { refreshToken });
        localStorage.setItem('accessToken', data.token);
        queue.forEach((p) => p.resolve(data.token));
        queue = [];
        original.headers.Authorization = `Bearer ${data.token}`;
        return api(original);
      } catch {
        queue.forEach((p) => p.reject());
        queue = [];
        localStorage.clear();
        window.location.href = '/login';
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(err);
  }
);

// ── Auth ─────────────────────────────────────────────────────────
export const authAPI = {
  register: (d) => api.post('/api/auth/register', d),
  login:    (d) => api.post('/api/auth/login', d),
  me:       ()  => api.get('/api/auth/me'),
  logout:   ()  => api.post('/api/auth/logout'),
  refresh:  (t) => api.post('/api/auth/refresh', { refreshToken: t }),
};

// ── User / Dashboard ─────────────────────────────────────────────
export const userAPI = {
  getDashboard:   ()  => api.get('/api/dashboard'),
  getCart:        ()  => api.get('/api/cart'),
  getCartCount:   ()  => api.post('/api/course/count', {}),
  toggleCart:     (d) => api.post('/api/course-toggle', d),
  getEnrolled:    ()  => api.post('/api/enrolled', {}),
  getEnrolledIds: ()  => api.post('/api/course/enrolled-ids', {}),
  finalizePayment: (d) => api.post('/api/course/finalize-payment', d),
  getPathways:    ()  => api.get('/api/user-pathways'),
  togglePathway:  (d) => api.post('/api/pathway-subscribe', d),
};

// ── Roadmap ──────────────────────────────────────────────────────
export const roadmapAPI = {
  generate:  (d)  => api.post('/api/roadmap', d),
  history:   ()   => api.get('/api/roadmap/history'),
  deleteOne: (id) => api.delete(`/api/roadmap/history/${id}`),
};

// ── Admin ────────────────────────────────────────────────────────
export const adminAPI = {
  getStats:      ()         => api.get('/api/admin/stats'),
  getUsers:      ()         => api.get('/api/admin/users'),
  updateRole:    (id, role) => api.patch(`/api/admin/users/${id}/role`, { role }),
  deleteUser:    (id)       => api.delete(`/api/admin/users/${id}`),
};

export default api;
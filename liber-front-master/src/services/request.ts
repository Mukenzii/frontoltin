import axios from 'axios';
import { loadState } from 'utils/storage';

const request = {
  private: axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL }),
  public: axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL }),
};

request.private.interceptors.request.use((config) => {
  const token = loadState('user');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token?.access}`,
    };
  }

  return config;
});

request.private.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error)
);

export default request;

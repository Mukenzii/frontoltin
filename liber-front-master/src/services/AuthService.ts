import axios from 'axios';
import { loadState, saveState } from 'utils/storage';

export const login = async (username: string, password: number | string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/account/user-login/`,
    {
      username,
      password,
    }
  );

  const token = response?.data?.access;
  if (token) {
    saveState('user', response.data);
  }

  return response.data;
};

export const isAuthenticated = () => {
  const user = loadState('user');
  if (!user) {
    return {};
  }
  return user;
};

import axios from 'axios';
import UserContext from 'context/user';
import { useContext } from 'react';
// import { store } from 'redux-state/store';

const request = {
  private: axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL }),
  public: axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL }),
};

const getToken = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { currentUser } = useContext(UserContext);
  return currentUser?.access;
};

request.private.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      Authorization: `${token}`,
    };
  }

  return config;
});

request.private.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error)
);

export default request;

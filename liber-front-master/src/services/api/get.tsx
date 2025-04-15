import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
export const getAllData = async (url: string) => {
  const data = await axios.get(url);
  return JSON.parse(JSON.stringify(data));
};

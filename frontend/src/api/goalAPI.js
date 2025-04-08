import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/goals';

export const getGoalsForToday = async (date) => {
  const response = await axios.get(`${BASE_URL}/${date}`);
  return response.data;
};

export const setGoalsForToday = async (date, tasks) => {
  const response = await axios.post(BASE_URL, { date, tasks });
  return response.data;
};

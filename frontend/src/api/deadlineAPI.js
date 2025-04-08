// src/api/deadlineApi.js
import axios from 'axios';
const BASE_URL = 'http://localhost:5000/api/deadlines';


export const fetchDeadlines = () => axios.get(BASE_URL);
export const createDeadline = (data) => axios.post(BASE_URL, data);
export const deleteDeadline = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateDeadlineCompletion = (id, completed) => axios.put(`${BASE_URL}/${id}`, { completed });
  
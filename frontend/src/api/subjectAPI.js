import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/subjects';

export const getSubjects = () => axios.get(BASE_URL);
export const addSubject = (subject) => axios.post(BASE_URL, subject);
export const deleteSubject = (id) => axios.delete(`${BASE_URL}/${id}`);
export const updateSubject = (id, updatedData) => axios.put(`${BASE_URL}/${id}`, updatedData);

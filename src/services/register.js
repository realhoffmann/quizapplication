import axios from 'axios';

export function registerUser(formData) {
  return axios.post('http://localhost:5000/api/user/create', formData);
}

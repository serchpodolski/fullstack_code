import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  return axios.get(`${baseUrl}api/all`).then(response => response.data)
}

const getByName = name => {
  return axios.get(`${baseUrl}api/name/${name}`).then(response => response.data)
}

// const create = newObject => {
//   return axios.post(baseUrl, newObject).then(response => response.data)
// }

// const remove = id => {
//   return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
// }

// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
// }

export default { getAll, getByName}
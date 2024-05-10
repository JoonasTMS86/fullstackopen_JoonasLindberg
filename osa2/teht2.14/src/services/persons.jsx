import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
  }

  const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

  const deletePerson = newObject => {
    return axios.delete(baseUrl + "/" + newObject.id)
  }

  export default {
    getAll: getAll,
    create: create,
    deletePerson: deletePerson
  }
import axios from "axios";
const url = "http://localhost:3001/persons";

const getAll = () => {
  const nonExisting = {
    id: 10000,
    name: "John Doe",
    number: 100,
  };
  const request = axios.get(url);
  return request.then((response) => response.data.concat(nonExisting));
};

const create = (newPerson) => {
  const request = axios.post(url, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => response.data);
};

const updateNumber = (id, newPerson) => {
  const request = axios.put(`${url}/${id}`, newPerson);
  return request.then((response) => response.data);
};

export default { getAll, create, deletePerson, updateNumber };

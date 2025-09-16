import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleForm = async (event) => {
    event.preventDefault();
    const exists = persons.some((person) => person.name === newName);
    if (exists || !newName || !newNumber) {
      alert(`${newName} is already added to phonebook`);

      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilteredName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filteredName} onChange={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        handleForm={handleForm}
        nameValue={newName}
        numberValue={newNumber}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h3>Numbers</h3>

      <Persons persons={persons} filteredName={filteredName} />
    </div>
  );
};

export default App;

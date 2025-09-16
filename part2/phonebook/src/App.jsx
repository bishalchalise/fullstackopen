import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsService from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleForm = (event) => {
    event.preventDefault();
    const exists = persons.some((person) => person.name === newName);
    if (exists || !newName || !newNumber) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newNumber,
      // id: String(persons.length + 1),
    };

    axios
      .post("http://localhost:3001/persons", personObject)
      .then((repsonse) => {
        setPersons(persons.concat(repsonse.data));
        setNewName("");
        setNewNumber("");
        console.log(repsonse);
      });
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

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.deletePerson(id).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
      });
    } else {
      return;
    }
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

      <Persons
        handleDelete={handleDelete}
        persons={persons}
        filteredName={filteredName}
      />
    </div>
  );
};

export default App;

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
    const personExisting = persons.find((person) => person.name === newName);
    const changedNumber = {
      ...personExisting,
      number: newNumber,
    };
    if (personExisting) {
      if (
        window.confirm(
          `${personExisting.name} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        personsService
          .updateNumber(personExisting.id, changedNumber)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personExisting.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            console.log(personExisting.name);
            alert(`${personExisting.name} was already deleted from server`);
            setPersons(persons.filter((n) => n.id !== personExisting.id));
            console.log(error.toString());
          });
        setNewNumber("");
        setNewName("");
        return;
      }
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };

    personsService.create(personObject).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id) => {
    const selectedPerson = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${selectedPerson.name} ?`)) {
      personsService
        .deletePerson(id)
        .then((deletedPerson) => {
          setPersons(
            persons.filter((person) => person.id !== deletedPerson.id)
          );
        })
        .catch((error) => {
          console.log(selectedPerson.name);
          alert(`${selectedPerson.name} was already deleted from server`);
          setPersons(persons.filter((p) => p.id !== id));
          console.log(error.toString());
        });
    } else {
      return;
    }
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

      <Persons
        handleDelete={handleDelete}
        persons={persons}
        filteredName={filteredName}
      />
    </div>
  );
};

export default App;

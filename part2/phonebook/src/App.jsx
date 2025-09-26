import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import personsService from "./services/persons";
import Notifications from "./components/Notifications";
import "./index.css";
const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredName, setFilteredName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(true);

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  if (!persons) {
    return null;
  }

  const setTimer = (sucess) => {
    setSuccessMessage(sucess);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  const handleForm = (event) => {
    event.preventDefault();
    const personExisting = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
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
            setErrorMessage(`Number of ${returnedPerson.name} updated`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setSuccessMessage(false);
            setErrorMessage(
              `${personExisting.name} was already deleted from server`
            );

            setPersons(persons.filter((n) => n.id !== personExisting.id));
          });
        setNewNumber("");
        setNewName("");
        return;
      } else {
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
      setErrorMessage(`Added ${createdPerson.name}`);
      setTimer(true);
    });
  };

  //handle delete
  const handleDelete = (id) => {
    const selectedPerson = persons.find((p) => p.id === id);
    const ok = window.confirm(`Delete ${selectedPerson.name} ?`);
    if (ok) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(
            persons.filter((person) => person.id !== selectedPerson.id)
          );

          setErrorMessage(`${selectedPerson.name} Sucessfully deleted`);
          setTimer(true);
        })
        .catch((error) => {
          setErrorMessage(
            `${selectedPerson.name} was already deleted from server`
          );

          setPersons(persons.filter((p) => p.id !== id));
          setTimer(false);
        });
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
      <Notifications
        className={successMessage ? "successMessage" : "error"}
        message={errorMessage}
      />
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

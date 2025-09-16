const Persons = ({ persons, filteredName, handleDelete }) => {
  const filterPersonsList = persons.filter((person) =>
    person.name.toLowerCase().includes(filteredName.toLowerCase())
  );
  // console.log(filterPersonsList);
  return filterPersonsList.map((person) => {
    return (
      <div key={person.name}>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDelete(person.id)}>Delete</button>
      </div>
    );
  });
};

export default Persons;

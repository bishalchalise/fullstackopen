const Persons = ({ persons, filteredName }) => {
  const filterPersonsList = persons.filter((person) =>
    person.name.toLowerCase().includes(filteredName.toLowerCase())
  );
  console.log(filterPersonsList);
  return filterPersonsList.map((person) => {
    return (
      <div key={person.name}>
        {person.name} {person.number}
      </div>
    );
  });
};

export default Persons;

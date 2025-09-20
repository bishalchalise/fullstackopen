const express = require("express");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.use(express.json());

app.get("/info", (request, response) => {
  const now = new Date();
  response.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${now}
    </div>`);
});
//get all persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
//get person by id
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

//delete person by id
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

//generate random ID
generateId = () => {
  const id = Math.random().toString(36).substring(2, 7);
  return String(id);
};
//create a person
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const nameChecker = persons.some(
    (p) => p.name.toLowerCase() === body.name.toLowerCase()
  );
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }
  if (nameChecker) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

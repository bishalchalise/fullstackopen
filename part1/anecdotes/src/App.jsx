import { useState } from "react";
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Heading = ({ text }) => <h1>{text}</h1>;

const Content = ({ content, votes }) => (
  <div>
    {content} <br /> has {votes} votes
  </div>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0));

  const onButtonClicked = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVotes = () => {
    const newVotes = [...voted];
    newVotes[selected] += 1;
    setVoted(newVotes);
    console.log(newVotes);
  };
  const maxVotes = Math.max(...voted);
  const maxVotesIndex = voted.indexOf(maxVotes);
  console.log(maxVotesIndex);

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Content content={anecdotes[selected]} votes={voted[selected]} />
      <Button onClick={onButtonClicked} text="new anecdotes" />
      <Button onClick={handleVotes} text="vote" />
      <Heading text="Anecdote with most votes" />
      <Content
        content={anecdotes[maxVotesIndex]}
        votes={voted[maxVotesIndex]}
      />
    </div>
  );
};

export default App;

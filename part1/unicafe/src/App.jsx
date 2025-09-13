import { useState } from "react";
const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {text === "positive" && "%"}
    </td>
  </tr>
);

const Statistic = ({ good, neutral, bad, all, average, positive }) => {
  if (all == 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGoodClick = () => setGood(good + 1);

  const onNeutralClick = () => setNeutral(neutral + 1);

  const onBadClick = () => setBad(bad + 1);

  const allFeedback = good + neutral + bad;

  const average = allFeedback > 0 ? (good - bad) / allFeedback : 0;

  const positive = allFeedback > 0 ? (good / allFeedback) * 100 : 0;

  return (
    <div>
      <Title text="give feedback" />
      <Button onClick={onGoodClick} text="good" />
      <Button onClick={onNeutralClick} text="neutral" />
      <Button onClick={onBadClick} text="bad" />
      <Title text="statistics" />
      <Statistic
        good={good}
        neutral={neutral}
        bad={bad}
        all={allFeedback}
        average={average.toFixed(1)}
        positive={positive.toFixed(1)}
      />
    </div>
  );
};
export default App;

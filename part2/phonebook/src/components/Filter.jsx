const Filter = ({ onChange, filteredName }) => {
  return (
    <div>
      filter shown with: <input value={filteredName} onChange={onChange} />
    </div>
  );
};

export default Filter;

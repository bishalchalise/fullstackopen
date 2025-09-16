const PersonForm = ({
  handleForm,
  numberValue,
  handleNameChange,
  nameValue,
  handlePhoneChange,
}) => {
  return (
    <form onSubmit={handleForm}>
      <div>
        name: <input value={nameValue} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;

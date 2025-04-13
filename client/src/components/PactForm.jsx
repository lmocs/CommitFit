import { useState } from "react";

const PactForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    user1_id: "",
    user2_id: "",
    start_date: "",
    end_date: "",
    stake_amount: "",
    contract_address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // pass data to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="user1_id" placeholder="User 1 ID" onChange={handleChange} />
      <input name="user2_id" placeholder="User 2 ID" onChange={handleChange} />
      <input name="start_date" type="date" onChange={handleChange} />
      <input name="end_date" type="date" onChange={handleChange} />
      <input name="stake_amount" placeholder="Stake (ETH)" onChange={handleChange} />
      <input name="contract_address" placeholder="Smart Contract Address" onChange={handleChange} />
      <button type="submit">Create Pact</button>
    </form>
  );
};

export default PactForm;

import React, { useState } from "react";

const DepositForm = ({ goals, onDeposit }) => {
  const [selectedId, setSelectedId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId || !amount) return;

    const goal = goals.find((g) => g.id === selectedId);
    onDeposit(selectedId, parseFloat(goal.savedAmount) + parseFloat(amount));
    setAmount("");
    setSelectedId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Make a Deposit</h2>
      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
        <option value="">Select Goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>{goal.name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Deposit Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Deposit</button>
    </form>
  );
};

export default DepositForm;

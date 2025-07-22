import React, { useState, useEffect } from "react";
// const URL = 'https://goal-json-server.onrender.com/goals'

const initialState = {
  name: "",
  category: "",
  targetAmount: 0,
  savedAmount: 0,
  deadline: "",
  createdAt: new Date().toISOString().split("T")[0],
};

const GoalForm = ({ onSubmit, editingGoal }) => {
  const [goal, setGoal] = useState(initialState);

  useEffect(() => {
    if (editingGoal) {
      setGoal(editingGoal);
    }
  }, [editingGoal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };
  
   const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: Number(value) });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(goal);
    
    setGoal(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingGoal ? "Edit Goal" : " New Goal"}</h2>
      <input name="name" placeholder="Goal Name" value={goal.name} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={goal.category} onChange={handleChange} />
      <input name="targetAmount" type="number" placeholder="Target Amount" value={goal.targetAmount} onChange={handleNumberChange} required />
      <input name="savedAmount" type="number" placeholder="Saved Amount" value={goal.savedAmount} onChange={handleNumberChange} />
      <input name="deadline" type="date" value={goal.deadline} onChange={handleChange} required />
      <button type="submit">{editingGoal ? "Update" : "Add"}</button>
    </form>
  );
};

export default GoalForm;

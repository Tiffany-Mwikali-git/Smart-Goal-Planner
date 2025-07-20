const API_URL = "http://localhost:3001/goals";

export const getGoals = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch goals");
  return await response.json();
};

export const addGoal = async (goal) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  if (!response.ok) throw new Error("Failed to add goal");
  return await response.json();
};

export const updateGoal = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH", // Or PUT depending on your need
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("Failed to update goal");
  return await response.json();
};

export const deleteGoal = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete goal");
};

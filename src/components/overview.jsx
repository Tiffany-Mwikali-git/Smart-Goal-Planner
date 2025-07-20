import React from "react";
import { differenceInDays, parseISO } from "date-fns";

const Overview = ({ goals }) => {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  return (
    <div>
      <h2>Overview</h2>
      <p>Total Goals: {goals.length}</p>
      <p>Total Saved: ${totalSaved.toLocaleString()}</p>
      <p>Completed Goals: {completedGoals}</p>
    </div>
  );
};

export default Overview;

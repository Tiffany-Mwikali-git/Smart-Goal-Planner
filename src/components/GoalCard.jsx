import React from "react";
import { formatDistanceToNow, isPast, differenceInDays, parseISO } from "date-fns";

const GoalCard = ({ goal, onDelete, onEdit }) => {
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const daysLeft = differenceInDays(new Date(goal.deadline), new Date());
  const overdue = isPast(new Date(goal.deadline)) && !isCompleted;

  return (
    <div className="goal-card">
      <h3>{goal.name}</h3>
      <p><strong>Category:</strong> {goal.category}</p>
      <p><strong>Target:</strong> ${goal.targetAmount.toLocaleString()}</p>
      <p><strong>Saved:</strong> ${goal.savedAmount.toLocaleString()}</p>
      <div className="progress-bar">
        <div style={{ width: `${progress}%`, background: 'green' }}>{progress.toFixed(0)}%</div>
      </div>
      {isCompleted && <p>✅ Goal Completed</p>}
      {overdue && <p style={{ color: "red" }}>⚠️ Overdue</p>}
      {daysLeft <= 30 && daysLeft > 0 && !isCompleted && (
        <p style={{ color: "orange" }}>⚠️ {daysLeft} days left</p>
      )}
      <p>Deadline: {formatDistanceToNow(parseISO(goal.deadline), { addSuffix: true })}</p>
      <button onClick={() => onEdit(goal)}>Edit</button>
      <button onClick={() => onDelete(goal.id)}>Delete</button>
    </div>
  );
};

export default GoalCard;

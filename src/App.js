
import './App.css';

function App() {
  const goals = [
    {
      "id": "1",

      "name": "Travel Fund - Japan",

      "targetAmount": 5000,

      "savedAmount": 3200,

      "category": "Travel",

      "deadline": "2025-12-31",

      "createdAt": "2024-01-15"
    },
  ]
  return (
    <div className="App">
      <header>
        <h1>Tracker</h1>
        <button>Add</button>
      </header>
      <section>
        <ol>
          {goals.map((goal) => (
            <li key={goal.id}>{goal.name}
            <div>progress: <progress max= '100' value={goal.savedAmount/ goal.targetAmount*100}></progress></div>
            <div>deadline: {goal.deadline}</div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default App;

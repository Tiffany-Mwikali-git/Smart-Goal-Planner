
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
const URL = 'http://localhost:4000/goals'

function App() {
  // const goals = [
  //   {
  //     "id": "1",

  //     "name": "Travel Fund - Japan",

  //     "targetAmount": 5000,

  //     "savedAmount": 3200,

  //     "category": "Travel",

  //     "deadline": "2025-12-31",

  //     "createdAt": "2024-01-15"
  //   },
  // ]

  const [goals, setGoals] = useState ([])
  const [ totalSavedAmount, setTotalSavedAmount] = useState (0)
  const [completedGoal, setCompletedGoal] = useState (0)
  useEffect (() => {
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      setGoals(data)
      let totalSaved = 0
      let totalCompleted = 0
      
      for (let goal of data) {
        totalSaved = goal.savedAmount + totalSaved
        console.log(goal.savedAmount)
        if (goal.targetAmount == goal.savedAmount) {
          totalCompleted += 1
        }
      }

      setTotalSavedAmount (totalSaved)
      setCompletedGoal(totalCompleted)
    })
  },[])
  function handledelete(id) { 
    fetch(`${URL}/${id}`, {method: 'DELETE'})
    .then(res => console.log(id))
  }
  return (
    <div className="App">
      <header>
        <h1>Tracker</h1>
        <button>Add</button>
        <div>Total goals:{goals.length}</div>
        <div>totalSavedAmount: {totalSavedAmount}</div>
        <div>completedGoal: {completedGoal}</div>
      </header>
      <section>
        <ol>
          {goals.map((goal) => (
            <li key={goal.id}>{goal.name}
            <div>saved/target: {goal.savedAmount}/{goal.targetAmount}</div>
            <div>remaining amount: {goal.targetAmount - goal.savedAmount}</div>
            <div>progress: <progress max= '100' value={goal.savedAmount/ goal.targetAmount*100}></progress></div>
            <div>deadline: {goal.deadline}</div>
            <form><button type='submit' onClick={ (event)=>handledelete(goal.id)}>Delete</button></form>
            <br/></li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default App;

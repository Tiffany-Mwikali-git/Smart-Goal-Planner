
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Warning from './components/Warning';
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
  const [deposit, setDeposit] = useState (0)
  const [currentGoal, setCurrentGoal] = useState({})

  useEffect (() => {
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      setGoals(data)
      let totalSaved = 0
      let totalCompleted = 0
      
      for (let goal of data) {
        totalSaved = goal.savedAmount + totalSaved
        if (goal.targetAmount === goal.savedAmount) {
          totalCompleted += 1
        }
      }

      setTotalSavedAmount (totalSaved)
      setCompletedGoal(totalCompleted)
      setCurrentGoal(data[0])
    })
  },[])
  function handledeposit() {
    const amount = Number(currentGoal.savedAmount) +  Number(deposit)
    const data = {
      savedAmount:amount 
    }
    fetch(`${URL}/${currentGoal.id}` , {
      method: 'PATCH', 
    headers:{
      'Content-type': "application/json"
    },
  body:JSON.stringify(data)})      
  }

  function handledelete(id) { 
    fetch(`${URL}/${id}`, {method: 'DELETE'})
    .then(res => console.log(id))
  }
  function handlecurrentgoal(id) {
    for (let goal of goals) {
      if (goal.id === id)
        setCurrentGoal(goal)
    }
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
      <form><h3>deposit form</h3><select value={currentGoal.id} onChange={event => handlecurrentgoal(event.target.value)}>
        {goals.map((goal, index) => (
          <option key={index} value={goal.id}>{goal.name}</option>
        ))}
      </select>
        <label htmlFor='amount'>Amount</label>
        <input onChange={event => setDeposit(event.target.value)} type='number' min='1' id='amount'></input>
        <button onClick={event => handledeposit()}>deposit</button>
      </form>
      <section>
        <ol>
          {goals.map((goal) => (
            <li key={goal.id}>{goal.name}
            <div>saved/target: {goal.savedAmount}/{goal.targetAmount}</div>
            <div>remaining amount: {goal.targetAmount - goal.savedAmount}</div>
            <div>progress: <progress max= '100' value={goal.savedAmount/ goal.targetAmount*100}></progress></div>
            <div>deadline: {goal.deadline}</div>
            <Warning/>
            <form><button type='submit' onClick={ (event)=>handledelete(goal.id)}>Delete</button></form>
            <br/></li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default App;

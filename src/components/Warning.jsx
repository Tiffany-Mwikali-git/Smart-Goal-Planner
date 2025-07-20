   /** /
   How much time is left for each goal
                  If a deadline is within 30 days and the goal is not complete, show a warning
                  If the deadline has passed without reaching the goal, mark it as Overdue
/** */
import {differenceInDays} from 'date-fns'
function Warning() {
    const date1 = new Date('2025-07-01')
     const date2 = new Date('2025-07-15')
    const timeLeft = differenceInDays(date1, date2)
    const goalReached = false
    console.log('warning')
    return (
        <div>
            <div>Time left: {timeLeft} </div>
            {!goalReached && timeLeft <= 30 ? <div>Less than 30 to complete</div> : ""}
            {!goalReached && timeLeft < 1 ? <div>status: overdue</div> : ""}
        </div>
    )
}

export default Warning
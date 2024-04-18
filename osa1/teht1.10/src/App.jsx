import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={() => props.function(props.value + 1)}>
    {props.text}
  </button>
)
}

const StatisticLine = (props) => {
  return (
    <div>
    {props.text} {props.value}
    </div>
)
}

const Statistics = (props) => {
  if(props.total === 0) {
    return (
      <div>
      <h1>statistics</h1>
      No feedback given
      </div>
    )
  }
  return (
    <div>
    <h1>statistics</h1>
    <StatisticLine text="good" value={props.good} />
    <StatisticLine text="neutral" value={props.neutral} />
    <StatisticLine text="bad" value={props.bad} />
    <StatisticLine text="all" value={props.total} />
    <StatisticLine text="average" value={(props.good + (props.bad * -1)) / props.total} />
    <StatisticLine text="positive" value={(props.good / props.total) * 100 + " %"} />
    </div>
)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" value={good} function={setGood} />
      <Button text="neutral" value={neutral} function={setNeutral} />
      <Button text="bad" value={bad} function={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />

    </div>
    
  )
}

export default App
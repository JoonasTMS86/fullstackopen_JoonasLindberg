import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
    <h1>statistics</h1>
      good {props.good} <br/>
      neutral {props.neutral} <br/>
      bad {props.bad} <br/>
      all {props.total} <br/>
      average {(props.good + (props.bad * -1)) / props.total} <br/>
      positive {(props.good / props.total) * 100} %
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
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} />

    </div>
    
  )
}

export default App
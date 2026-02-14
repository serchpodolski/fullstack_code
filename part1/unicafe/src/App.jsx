import { useState } from 'react'
import './App.css'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const Statistics = (props) => {
  // const dataToDisplay = Object.entries(props.statsData).map(([item, qty]) => (
  //   <p key={item}>
  //     {item}: {qty}
  //   </p>
  // ))

  if (props.statsData.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  console.log(props.statsData)
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.statsData.good} />
          <StatisticLine text="neutral" value={props.statsData.neutral} />
          <StatisticLine text="bad" value={props.statsData.bad} />
          <StatisticLine text="all" value={props.statsData.all} />
          <StatisticLine text="average" value={props.statsData.average} />
          <StatisticLine text="positive" value={props.statsData.positive + ' %'} />  
        </tbody>
      </table>
    </div>  
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statisticsInfo = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: good + neutral + bad,
    average: ((good - bad) / (good + neutral + bad)) || 0 ,
    positive: ((good / (good + neutral + bad)) * 100) || 0
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics statsData={statisticsInfo} />
    </>
  )
}

export default App

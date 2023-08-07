import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [solution, setSolution] = useState("percy")
  const [guesses, setGuess] = useState(Array(6).fill(null))

  function onKeyPressed (e) {
    const char = e.key
    const regex = /^[a-z]$/;

    //Listen to only a to z
    if (regex.test(char)){
      console.log(char)
    }
  }

  useEffect(() => {
    //API Request for word
    // const randomWordFromAPI =
    // setSolution(randomWordFromAPI)

    document.addEventListener("keydown", onKeyPressed)
    
    return () => {
      document.removeEventListener("keydown", onKeyPressed)
    }

  },[])
  
  const Line = ({ guess }) => {
    const boxes = []

    for(let i = 0; i < solution.length; i++){
      const char = guess[i]
      boxes.push(<div key={i} className='box'>{char}</div>)
    }

    return <div className='line'>{boxes}</div>
  }


  return (
    <div className='game'> 
      <h1>Wordle clone</h1>
      {guesses.map((guess, idx) => {
        return <Line key={idx} guess={guess ? guess: ""} />
      })}
    </div>
  );
}

export default App;

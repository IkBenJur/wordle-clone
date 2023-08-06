import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [solution, setSolution] = useState("percy")
  const [guesses, setGuess] = useState(Array.from(5).fill(null))

  return (
    <div> 
      <h1>Wordle clone</h1>
      {console.log(guesses)}
    </div>
  );
}

export default App;

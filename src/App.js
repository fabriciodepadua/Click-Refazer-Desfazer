
import './App.css';

import { useState} from 'react'

function App() {
  const [count, setCount] = useState([]);
  const [undid, setUndid] = useState([]);


  //Botão Refazer
  const handleClick = (event) => {
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY
    }
    console.log(newDot)
    setCount((prev) => [...prev, newDot])
  }
  const handleUndo = (event) => {
    event.stopPropagation()

    if (count.length === 0) {
      return
    }

    const lastItem = count[count.length -1];
    setUndid((prev) => [...prev, lastItem])
    

    setCount((prev) => {
      const newArr = [...prev].slice(0, -1)
      return newArr

    });

  }

  // Botão Desfazer
  const handleRedo = (event) => {
    event.stopPropagation();
    if (undid.length === 0) {
      return
    }
    const recoveredDot = undid[undid.length -1]
    setUndid((prev) => {
      const newArr = [...prev].slice(0, -1)
      return newArr
    });
    setCount((prev) => [...prev, recoveredDot]);
  };
  return (
    <div id="page" onClick={handleClick}>
      <button onClick={handleUndo}>Desfazer</button>
      <button onClick={handleRedo}>Refazer</button>
      {count.map((item, index) => (
        <span key={index} className="dot" style={{left: item.clientX, top: item.clientY}}/>
      ))}
     
    </div>
  );
}

export default App;

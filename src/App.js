import NavBar from "./components/navbar";
import Clock from "./components/clock";
import StopWatch from "./components/stopWatch";
import Alarm from "./components/alarm";
import "./App.css";
import {useState } from "react";

function App() {
  const [isopen, setIsOpen] = useState(1);
  function handleOpened(openNum){
    setIsOpen(openNum)
  }
  return (
    <div className="App">
      <NavBar onOpenedTap={handleOpened}/>
      <div className="content-card">
        {isopen === 1 ? <Clock /> : isopen === 2 ? <StopWatch /> : <Alarm />}
      </div>
    </div>
  );
}

export default App;

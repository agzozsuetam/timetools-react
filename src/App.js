import './App.css';
import React, {useState} from 'react';
import Display from './components/Display';
import Alarm from './components/Alarm';
import Timer from './components/Timer';
import Stopwatch from './components/Stopwatch';

function App() {
  const [page, setPage] = useState('alarm');
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [milisecond, setMilisecond] = useState(0);

  const pageHandler = newPage => {
    if(newPage !== page){
      setPage(newPage);
      setHour(0);
      setMinute(0);
      setSecond(0);
      setMilisecond(0);
    };    
  }

  return (
    <div className="App">
      <header>
        <button className={page==='alarm' ? 'activePageButton' : 'buttonOne'} onClick={() => pageHandler('alarm')}>Alarm</button>
        <button className={page==='stopwatch' ? 'activePageButton' : 'buttonOne'} onClick={() => pageHandler('stopwatch')}>Stopwatch</button>
        <button className={page==='timer' ? 'activePageButton' : 'buttonOne'} onClick={() => pageHandler('timer')}>Timer</button>
      </header>
      <Display page={page} hour={hour} minute={minute} second={second} milisecond={milisecond} />
      {page==='alarm' && <Alarm 
      hour={hour} 
      minute={minute} 
      setHour={setHour} 
      setMinute={setMinute} 
      />}
      {page==='stopwatch' && <Stopwatch 
      hour={hour} 
      minute={minute} 
      second={second} 
      milisecond={milisecond} 
      setHour={setHour} 
      setMinute={setMinute}
      setSecond={setSecond}
      setMilisecond={setMilisecond}
      />}
      {page==='timer' && <Timer
      hour={hour} 
      minute={minute} 
      second={second}
      setHour={setHour} 
      setMinute={setMinute}
      setSecond={setSecond}  
      />}      
    </div>
  );
}

export default App;

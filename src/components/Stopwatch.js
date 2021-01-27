import React, {useState, useEffect} from 'react';
import useSound from 'use-sound';
import beep from '../sounds/beep.mp3';

const Stopwatch = props => {
    const [measure, setMeasure] = useState(false);
    const [timeoutClick, setTimeoutClick] = useState(false);
    const [timeBeepClick, setTimeBeepClick] = useState(false);
    const [intBeepClick, setIntBeepClick] = useState(false);

    const [play] = useSound(beep);

    const [timeoutH, setTimeoutH] = useState(0);
    const [timeoutM, setTimeoutM] = useState(0);
    const [timeoutS, setTimeoutS] = useState(0);

    const [timeBeepH, setTimeBeepH] = useState(0);
    const [timeBeepM, setTimeBeepM] = useState(0);
    const [timeBeepS, setTimeBeepS] = useState(0);

    const [intBeepH, setIntBeepH] = useState(0);
    const [intBeepS, setIntBeepS] = useState(0);
    const [intBeepM, setIntBeepM] = useState(0);

    useEffect(
        () => {
            const adder = setInterval(() => {
                    if(measure){
                        props.setMilisecond(props.milisecond+1);
                        if(props.milisecond===99){
                            props.setMilisecond(0);
                            props.setSecond(props.second+1);
                        }
                        if(props.second>59){
                            props.setSecond(0);
                            props.setMinute(props.minute+1);
                        };
                        if(props.minute>59){
                            props.setMinute(0);
                            props.setHour(props.hour+1);
                        }
                    }
                    if(timeBeepClick && timeBeepS*1===props.second && timeBeepM*1===props.minute && timeBeepH*1===props.hour){
                        play();
                        setTimeBeepClick(false);
                    }
                    if((props.hour || props.minute || props.second) && measure && intBeepClick && (props.hour*3600+props.minute*60+props.second*1)%(intBeepH*3600+intBeepM*60+intBeepS*1)===0){
                        play();
                    }
            }, 10);
            return () => clearInterval(adder);          
        }
    )
    
    useEffect(() => {
        if(timeoutClick && (timeoutH || timeoutM || timeoutS)){
            const timeout = setTimeout(() => {
                setMeasure(true);
            }, (timeoutH*3600+timeoutM*60+timeoutS)*1000);
            return () => {
                clearTimeout(timeout);
                if(!timeoutH && !timeoutM && !timeoutS){
                    setTimeoutClick(false);
                }
            }
        }
    });

    useEffect(
        () => {
            const updater = setInterval(() => {
                    if(timeoutClick && (timeoutH || timeoutM || timeoutS)){
                        if(timeoutS){
                            setTimeoutS(timeoutS-1)
                        }else if(timeoutM){
                            setTimeoutM(timeoutM-1)
                        }else if(timeoutH){
                            setTimeoutH(timeoutH-1)
                        }
                    }
            }, 1000);
            return () => {
                clearInterval(updater);
                if(!timeoutH && !timeoutM && !timeoutS){
                    setTimeoutClick(false);
                };
            };
        }
    )

    const reset = () => {
        props.setHour(0);
        props.setMinute(0);
        props.setSecond(0);
        props.setMilisecond(0);
    }

    return(
        <>
            <div>
                <button className='buttonTwo' onClick={() => {
                    setMeasure(measure ? false : true);
                    setTimeoutS(document.getElementById('root').children[0].children[3].children[1].children[2].children[0].value*1)
                    setTimeoutM(document.getElementById('root').children[0].children[3].children[1].children[1].children[0].value*1)
                    setTimeoutH(document.getElementById('root').children[0].children[3].children[1].children[0].children[0].value*1)
                    }}>{measure ? 'Stop' : 'Start'}</button>
                <button className='buttonTwo' onClick={() => {reset()}}>Reset</button>
            </div>
            <div className='vertDiv'>
                <h2>Start on timeout</h2>
                <div className='horDiv'>
                    <div className='horDivInside'>
                        <input onChange={event => setTimeoutH(event.target.value)}></input>
                        <p>Hours</p>
                    </div>
                    <div className='horDivInside'>
                        <input onChange={event => setTimeoutM(event.target.value)}></input>
                        <p>Minutes</p>
                    </div>
                    <div className='horDivInside'>
                        <input onChange={event => setTimeoutS(event.target.value)}></input>
                        <p>Seconds</p>
                    </div>
                </div>
                <div className='horDiv'>
                    <button className='buttonSet' onClick={() => setTimeoutClick(!timeoutClick ? true : false)}>{(timeoutClick && (timeoutH || timeoutM || timeoutS)) ? (timeoutH<10 ? '0'+timeoutH.toString() : timeoutH.toString())+':'+(timeoutM<10 ? '0'+timeoutM.toString() : timeoutM.toString())+':'+(timeoutS<10 ? '0'+timeoutS.toString() : timeoutS.toString()) : 'Set'}</button>
                </div>
            </div>
            <div className='vertDiv'>
                <h2>Beep at set time</h2>
                <div className='horDiv'>
                    <div className='horDivInside'>
                        <input onChange={event => setTimeBeepH(event.target.value)}></input>
                        <p>Hours</p>
                    </div>
                    <div className='horDivInside'>
                        <input onChange={event => setTimeBeepM(event.target.value)}></input>
                        <p>Minutes</p>
                    </div>
                    <div className='horDivInside'>
                        <input onChange={event => setTimeBeepS(event.target.value)}></input>
                        <p>Seconds</p>
                    </div>
                </div>
                <div className='horDiv'>
                    <button className='buttonSet' onClick={() => setTimeBeepClick(timeBeepClick ? false : true)}>{timeBeepClick ? 'Beep ready' : 'Set'}</button>
                </div>
            </div>
            <div className='vertDiv'>
                <h2>Beep on interval</h2>
                <div className='horDiv'>
                    <div className='horDivInside'>
                        <input onChange={event => setIntBeepH(event.target.value)}></input>
                        <p>Hours</p>
                    </div>
                    <div className='horDivInside'>
                        <input onChange={event => setIntBeepM(event.target.value)}></input>
                        <p>Minutes</p>
                    </div>
                    <div className='horDivInside'>
                        <input onChange={event => setIntBeepS(event.target.value)}></input>
                        <p>Seconds</p>
                    </div>
                </div>
                <div className='horDiv'>
                    <button className='buttonSet' onClick={() => setIntBeepClick(intBeepClick ? false : true)}>{intBeepClick ? 'Beep ready' : 'Set'}</button>
                </div>
            </div>
        </>
    )
};

export default Stopwatch;

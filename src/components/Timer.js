import React, {useState, useEffect} from 'react';
import useSound from 'use-sound';
import beep from '../sounds/beep.mp3';

const Timer = props => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [sound, setSound] = useState(false)

    const [play, {stop}] = useSound(beep);

    const [presets, setPresets] = useState([{}])

    useEffect(
        () => {
            const timeDown = setInterval(() => {
                if(timeLeft<60){
                    props.setSecond(timeLeft);
                    props.setMinute(0);
                    props.setHour(0);
                }else if(timeLeft<3600){
                    props.setMinute(Math.floor(timeLeft/60));
                    props.setSecond(timeLeft%60);
                    props.setHour(0);
                }else if(timeLeft>=3600){
                    props.setHour(Math.floor(timeLeft/3600));
                    props.setMinute(Math.floor((timeLeft-Math.floor(timeLeft/3600)*3600)/60));
                    props.setSecond((timeLeft-Math.floor(timeLeft/3600)*3600)%60);
                }
                if(timeLeft){
                    setTimeLeft(timeLeft-1);
                }else if(!timeLeft && sound){
                    play();
                }
            }, 1000);
            return () => clearInterval(timeDown);
        }
    )

    const stopReset = () => {
        if(!timeLeft && sound){
            stop();
            setSound(false);
        }else if(timeLeft && sound){
            setTimeLeft(0);
            setSound(false);
        }
    }

    const deletePreset = index => {
        const newPresets = [...presets];
        newPresets.splice(index, 1);
        setPresets(newPresets);
    }

    return(
        <>
            <div>
                <button className='buttonTwo' onClick={() => {
                    setTimeLeft(timeLeft+10);
                    if(!sound){
                        setSound(true);
                    };
                }}>10 sec</button>
                <button className='buttonTwo' onClick={() => {
                    setTimeLeft(timeLeft+40);
                    if(!sound){
                        setSound(true);
                    };
                }}>40 sec</button>
            </div>
            <div>
                <button className='buttonTwo' onClick={() => {
                    setTimeLeft(timeLeft+20);
                    if(!sound){
                        setSound(true);
                    };
                }}>20 sec</button>
                <button className='buttonTwo' onClick={() => {
                    setTimeLeft(timeLeft+50);
                    if(!sound){
                        setSound(true);
                    };
                }}>50 sec</button>
            </div>
            <div>
                <button className='buttonTwo' onClick={() => {
                    setTimeLeft(timeLeft+30);
                    if(!sound){
                        setSound(true);
                    };
                }}>30 sec</button>
                <button className='buttonTwo' onClick={() => {
                    setTimeLeft(timeLeft+60);
                    if(!sound){
                        setSound(true);
                    };
                }}>60 sec</button>
            </div>
            <button className='buttonOne' onClick={() => stopReset()}>{(sound && timeLeft) ? 'Reset' : 'Stop'}</button>
            <div id='presetsDiv' className='vertDiv'>
                {presets.map((preset, index) => (
                <div className='horPreDiv' key={index}>
                    <div className='horDivInside'>
                        <p>Hours</p>
                        <input onChange={event => {if(!event.target.value.length){event.target.value=0}}}></input>
                    </div>
                    <div className='horDivInside'>
                        <p>Minutes</p>
                        <input onChange={event => {if(!event.target.value.length){event.target.value=0}}}></input>
                    </div>
                    <div className='horDivInside'>
                        <p>Seconds</p>
                        <input onChange={event => {if(!event.target.value.length){event.target.value=0}}}></input>
                    </div>
                    <div className='horDiv'>
                        <button className='buttonTwo' onClick={event => {
                            setTimeLeft(event.target.parentNode.parentNode.children[0].children[1].value*3600+event.target.parentNode.parentNode.children[1].children[1].value*60+event.target.parentNode.parentNode.children[2].children[1].value*1);
                            if(!sound){
                                setSound(true);
                            };
                        }}>Set</button>
                        <button onClick={() => deletePreset(index)}>X</button>
                    </div>
                </div>
            ))}
            {presets.length<5 && (
                <>
                    <button className='buttonTwo' id='addPresetBtn' onClick={() => setPresets([...presets, {}])}>Add</button>
                </>
            )}
            </div>
        </>
    )
};

export default Timer;
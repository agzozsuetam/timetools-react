import React, {useState, useEffect} from 'react';
import useSound from 'use-sound';
import ring from '../sounds/ring.mp3';

const Alarm = props => {
    const [sound, setSound] = useState(false);

    let current = new Date();
    let currH = current.getHours();
    let currM = current.getMinutes();
    let currS = current.getSeconds();
    let setH = props.hour;
    let setM = props.minute;

    const [play, {stop}] = useSound(ring);

    const setHandler = () => {
        setSound(sound ? false : true);
        if(sound){
            stop();
        }
    }

    useEffect(
        () => {
            const checker = setInterval(() => {
                if(sound){
                    setSound(sound===true ? 1 : true);
                };
                if(sound && currH===setH && currM===setM && currS===0){
                    play();
                }
            }, 1000);
            return () => clearInterval(checker);
        }
    )

    return(
        <>
        <div>
            <button className='plusMinusBtn' onClick={() => props.setHour(props.hour!==23 ? props.hour+1 : 0)}>+</button>
            <button className='plusMinusBtn' onClick={() => props.setHour(props.hour!==0 ? props.hour-1 : 23)}>-</button>
            <button className='plusMinusBtn' onClick={() => props.setMinute(props.minute!==59 ? props.minute+1 : 0)}>+</button>
            <button className='plusMinusBtn' onClick={() => props.setMinute(props.minute!==0 ? props.minute-1 : 59)}>-</button>
        </div>
        <button className='buttonOne' onClick={() => {setHandler()}}>{sound ? 'Off' : 'Set'}</button>
        </>
    )
};

export default Alarm;
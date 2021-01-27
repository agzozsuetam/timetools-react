import React from "react";

const Display = props => {
    

    return(
        <>
            {props.page==='alarm' && <h1>{props.hour<10 ? '0'+props.hour : props.hour}:{props.minute<10 ? '0'+props.minute : props.minute}</h1>}
            {props.page==='timer' && <h1>{props.hour<10 ? '0'+props.hour : props.hour}:{props.minute<10 ? '0'+props.minute : props.minute}:{props.second<10 ? '0'+props.second : props.second}</h1>}
            {props.page==='stopwatch' && <h1>{props.hour<10 ? '0'+props.hour : props.hour}:{props.minute<10 ? '0'+props.minute : props.minute}:{props.second<10 ? '0'+props.second : props.second}:{props.milisecond<10 ? '0'+props.milisecond : props.milisecond}</h1>}
        </>
    )
}

export default Display;
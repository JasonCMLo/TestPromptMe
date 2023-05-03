import React from "react";
import Countdown from "react-countdown";

function Timer(props) {
  let complete = false;
  let warning = false;
  let convertToTimer = (int) => {

    let seconds = Math.trunc(int/1000) % 60;
    let minutes = Math.trunc(int/60000);
    let formatSecond;
    let formatMinute;
  
    if (seconds < 10) {
      formatSecond = "0"+ seconds;
    } else {
      formatSecond = seconds;
    }
  
    if (minutes < 10) {
      formatMinute = "0" + minutes;
    } else {
      formatMinute = minutes;
    }

    if (minutes === 0 && seconds === 0 && complete === false) {
      props.timesUp();
      complete = true;
    }

    if (minutes <= 5 && !warning) {
      props.warning();
      warning = true;
    }
  
    return `${formatMinute} : ${formatSecond}`
  
  }


  return (
    <Countdown
        date={Date.now() + 10000}
        intervalDelay={0}
        precision={3}
        renderer={props => <div>
          {convertToTimer(props.total)}
          </div>}
      />
  )

}

export default Timer;
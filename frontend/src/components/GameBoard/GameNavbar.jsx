import { useState, useEffect } from "react";
import Circle from './../../assets/circle-fill.svg'

export default function GameNavbar({timeleft, usersOnline}) {

  // const [DOMtimeLeft, setDOMTimeLeft] = useState(timeleft);

  // Function to convert seconds to minutes and seconds
  const convertTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    
  };

  
  // useEffect(() => {
  //   setDOMTimeLeft(timeleft);
  // }, [timeleft]);

  // useEffect to handle the countdown
  // useEffect(() => {
  //   // Check if there is still time left
  //   if (DOMtimeLeft > 0) {
  //     const timerId = setTimeout(() => {
  //       setDOMTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
  //     }, 1000);

  //     return () => clearTimeout(timerId); // Cleanup timeout on unmount or when state changes
  //   }
  // }, [DOMtimeLeft]); // Dependency array listens to changes in DOMtimeLeft

  
  return (
    <nav className="p-4 w-full sm:w-80 shadow-md sm:rounded-lg">
      <ul className="flex justify-between items-center text-slate-700 text-sm">
        <li className="">
          <a href="/">Wyjście</a>
        </li>
        <li className="">Czas: {convertTime(timeleft)}</li>
        <li className="flex">
          <img src={Circle} alt="online" className="p-1" />
          Online: {usersOnline}
        </li>
      </ul>
    </nav>
  );
}
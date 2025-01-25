import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Graph from '../components/Graph'

export default function LandingPage() {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const currTime = new Date().toLocaleTimeString();
    const morningTime = "00:00:00";
    const afternoonTime = "12:00:00";
    const eveningTime = "17:30:00";
    const messages = ["Good Morning, ", "Good Afternoon, ", "Good Evening, "];

    if (currTime >= morningTime && currTime < afternoonTime) {
      setWelcomeMessage(messages[0]);
    } else if (currTime >= afternoonTime && currTime < eveningTime) {
      setWelcomeMessage(messages[1]);
    } else {
      setWelcomeMessage(messages[2]);
    }
  }, []); // Empty dependency array ensures it runs once when the component mounts.

  return (
    <div style={{fontFamily: 'Montserrat', fontWeight: 'bold', backgroundColor: "#ff6b6b", height: "100vh"}} className='flex flex-col items-center pt-3 text-center text-white'>
      <div>
        <h1 className='mb-3 text-3xl'>{welcomeMessage} NAME GOES HERE</h1>
      </div>

      <Link 
        to="/login" 
        className='text-white hover:text-slate-300 px-4 py-2 rounded transition duration-300'
      >
        Login
      </Link>
      <Link 
        to="/signup" 
        className='text-white hover:text-slate-300 px-4 py-2 rounded transition duration-300'
      >
        Signup
      </Link>

      <Graph/>
    </div>
  );
}

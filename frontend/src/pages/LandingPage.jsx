import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Graph from '../components/Graph'

export default function LandingPage() {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const currTime = new Date();
    const morningTime = new Date();
    morningTime.setHours(0, 0, 0, 0); 
  
    const afternoonTime = new Date();
    afternoonTime.setHours(12, 0, 0, 0); 
  
    const eveningTime = new Date();
    eveningTime.setHours(17, 30, 0, 0); 
  
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
    <div style={{fontFamily: 'Montserrat', fontWeight: 'bold', backgroundColor: "#ff6b6b", height: "100vh"}} className='flex flex-col items-center justify-center pt-3 text-center text-white'>
      <div>
        <h1 className='mb-3 text-3xl'>{welcomeMessage} NAME GOES HERE</h1>
      </div>

      <Graph/>
    </div>
  );
}

import React from 'react'
import "../styles/LandingPage.css";
import { Link } from 'react-router-dom'

const LandingPage = () => {
  const features = {
    'Smart Sleep': 'Avoid Sleeping High with Our Smart Adderall Sleep Avoidance Capabilities',
    'Concentration Tracking': 'Monitor How Well Your Medications are Working Over Time',
    'Easy Logging': 'Quickly Log Your Medications with Our User-Friendly Interface'
  };

  const statistics = {
    'Adult ADHD Prevalence': '15.5 Million US Adults were diagnosed with ADHD in 2023.',
    'Global Impact': '366.33 Million Adults were affected by ADHD in 2023.',
    'Our Future': 'Nearly 11.4% of children in the US were dagnosed with ADHD in 2022.'
  }

  return (
    <div>
      <div style={{width: "100vw", height: "calc(100% - (var(--spacing) * 16)", background: "linear-gradient(#ff6b6b, #feb47b)"}} className="flex flex-col justify-center items-center"> 
          
          <div style={{width: "100%", minHeight: "100%"}} className="flex flex-row items-center justify-center p-5">
              <div style={{minHeight: "calc(100% - (var(--spacing) * 16))",width: "25%"}} className="flex flex-col">
                  <h1 className="theH1" style={{color: "#F0EAD6", fontSize: "6rem"}}>hi there.</h1>
                  <h2 className="theH2" style={{color: "#FFFFF0"}}> welcome to pill pal.</h2>
              </div>

              <div style={{width: "75%", minHeight: "calc(100% - (var(--spacing) * 16))"}} className="flex justify-end"> 
                  <img className='pillbottle' src="pillbottle.webp" />    
              </div>
              
          </div>

          <div>
            <img className="w-10 h-10 arrow" src="arrow.png"/>
          </div>
      </div>



      <div style={{width: "100vw", minHeight: "100vh", background: "linear-gradient(#feb47b, #F0EAD6)"}} class="flex flex-col justify-center items-center">
        <h1 style={{color: "#333333", fontSize: "3rem"}}>
          Core Features
        </h1>
        <div style={{width: "80%", backdropFilter: "blur(20px)"}} class="flex flex-row rounded">
          {Object.keys(features).map(key => {return(
            <div style={{background: "#F0EAD6", minWidth: "10%", color: "black", margin: "10px", padding: "10px"}} class="rounded flex flex-col justify-center items-center transition transform duration-300 hover:scale-108">
              <h2 class="text-center"> {key} </h2>
              <p class="text-center"> {features[key]} </p>
            </div>
          )})}
        </div>

        <h1 style={{color: "#333333", fontSize: "3rem", marginTop: "2%"}}>
          Why is ADHD an Issue?
        </h1>
        <div style={{width: "80%", backdropFilter: "blur(20px)"}} class="flex flex-row rounded">
          {Object.keys(statistics).map(key => {return(
            <div style={{background: "#F0EAD6", minWidth: "10%", color: "black", margin: "10px", padding: "10px"}} class="rounded flex flex-col justify-center items-center transition transform duration-300 hover:scale-108">
              <h2 class="text-center"> {key} </h2>
              <p class="text-center"> {statistics[key]} </p>
            </div>
          )})}
        </div>

        <div class="w-full border-black text-center">
          <h1 style={{fontSize: "3rem", margin: "2%"}}> Ready to Start Planning? </h1>
          <Link to='/login' style={{background: '#feb47b'}} className='m-2 opacity-70 text-white text-xl px-6 py-3 rounded-lg font-semibold hover:opacity-100 transition duration-300 transform hover:scale-105 active:scale-95'> Login </Link>
          <Link to='/signup' style={{background: "#ff6b6b"}} className='m-2 opacity-70 text-white text-xl px-6 py-3 rounded-lg font-semibold hover:opacity-100 transition duration-300 transform hover:scale-105 active:scale-95'> Sign Up </Link>
        </div>
      </div>

      

      
    </div>

    
  )
}

export default LandingPage


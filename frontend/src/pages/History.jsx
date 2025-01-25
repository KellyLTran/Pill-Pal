import React from 'react'
import { useState } from 'react'
import Graph from '../components/Graph'
import {Button, Dropdown, Form, DropdownButton} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import HistoryInfo from '../components/HistoryInfo'


const History = () => {
  return (
    <div style={{fontFamily: 'Montserrat', backgroundColor: "#ff6b6b", height: "100vh"}} className='flex flex-row items-center justify-center pt-3 text-center text-white'>
        <HistoryInfo/>

        <div style={{width:"50%", minHeight: "50%", boxShadow: "0px 0px 5px rgba(0,0,0,0.5)", borderRadius: "3%"}} className='flex justify-center items-center'>
            <Graph/>
        </div>
    </div>
  )
}

export default History
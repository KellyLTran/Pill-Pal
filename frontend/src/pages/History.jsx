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

        <Graph/>
    </div>
  )
}

export default History
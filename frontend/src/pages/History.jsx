import React from 'react'
import { useState } from 'react'
import Graph from '../components/Graph'
import {Button, Dropdown, Form, DropdownButton} from 'react-bootstrap'
import DatePicker from 'react-datepicker'


const History = () => {
    const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{fontFamily: 'Montserrat', backgroundColor: "#ff6b6b", height: "100vh"}} className='flex flex-row items-center justify-center pt-3 text-center text-white'>
        <div style={{width:"50%", minHeight: "50%", border: "solid 3px black"}} className='flex justify-center items-center'>
            <div style={{width:"80%", height: "80%", border: "solid 3px black"}} className='flex flex-column bg-white text-black'>
                <h2 className='m-3 p-0'>Log Medication</h2>
                <p>Select Date</p>
                <DatePicker
                    selected={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    className="form-control" // Use React Bootstrap's form control styling
                    dateFormat="MM/dd/yyyy"
                />

            </div>
        </div>

        <div style={{width:"50%", minHeight: "50%", border: "solid 3px black"}} className='flex justify-center items-center'>
            <div>
                <Graph/>
            </div>
        </div>
    </div>
  )
}

export default History
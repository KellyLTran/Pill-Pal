import React from 'react'
import {Button, Dropdown, Form, DropdownButton} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { useState } from 'react'

const HistoryInfo = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{width:"50%", minHeight: "50%"}} className='flex justify-center items-center'>
                <div style={{width:"80%", height: "80%"}} className='flex flex-column bg-transparent text-black'>
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
  )
}

export default HistoryInfo
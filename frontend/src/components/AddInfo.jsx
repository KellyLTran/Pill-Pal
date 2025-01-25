import React from 'react'
import {Button, Dropdown, Form, DropdownButton} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { useState } from 'react'

const AddInfo = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div style={{width:"50%", minHeight: "50%"}} className='flex justify-center items-center'>
                <div style={{width:"80%", height: "80%"}} className='flex flex-column bg-transparent text-black items-start'>
                    <p className='m-3 p-0 text-xs'> Record Dosage</p>
    
                </div>
    </div>
  )
}

export default AddInfo
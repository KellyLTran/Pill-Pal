import React from 'react'
import {Button, Dropdown, Form, DropdownButton} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { useState } from 'react'

const AddInfo = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const pills = ["Adderall", "Percusets", "Pilly Willies"];

  return (
    <div style={{width:"50%", minHeight: "50%"}} className='flex justify-center items-center'>
                <div style={{width:"80%", height: "80%"}} className='flex flex-column bg-transparent text-white items-start'>
                    <p className='text-xl'> Dosage Amount </p>
                    <Form.Control type="number"/>

                    <p className='text-xl mt-3'> Medicine </p>
                    <DropdownButton variant="light" title={"Choose Medicine"}>
                        {pills.map((pill) => {
                            return(
                                <Dropdown.Item>
                                    {pill}
                                </Dropdown.Item>
                            )
                        })} 
                    </DropdownButton>
                </div>
    </div>
  )
}

export default AddInfo
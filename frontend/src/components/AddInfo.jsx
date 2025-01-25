import React from 'react'
import {Button, Dropdown, Form, DropdownButton} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { useState } from 'react'

const AddInfo = ({allMeds, setSelectedMed}) => {
  const [displayPill, setDisplayPill] = useState("");

  return (
    <div style={{width:"50%", minHeight: "50%"}} className='flex justify-center items-center'>
                <div style={{width:"80%", height: "80%"}} className='flex flex-column bg-transparent text-white items-start'>
                    <p className='text-xl'> Dosage Amount </p>
                    <Form.Control type="number"/>

                    <p className='text-xl mt-3'> Select Medicine </p>
                    <DropdownButton variant="light" title={displayPill}>
                        {allMeds.map((pill) => {
                            return(
                                <Dropdown.Item onClick={() => {setDisplayPill(pill.name); setSelectedMed(pill._id); console.log(pill._id);}}>
                                    {pill.name}
                                </Dropdown.Item>
                            )
                        })} 
                    </DropdownButton>
                </div>
    </div>
  )
}

export default AddInfo
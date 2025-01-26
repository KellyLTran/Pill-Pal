import React from 'react'
import { useState, useEffect } from 'react'
import {Button, Dropdown, Form, DropdownButton} from 'react-bootstrap'
import { axiosInstance } from '../lib/axios'


const History = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const testUser = "679577a1e24a10f56b7ee79e"; //john doe
  const [userEntries, setUserEntries] = useState([]);
  const [pillMapping, setPillMapping] = useState({});
  
  useEffect(() => {
    axiosInstance.get(`/user/${testUser}/history`).then(res => {
      if(res.data && res.data.entryHistory) {
        console.log(res.data.entryHistory);
        const sortedEntries = res.data.entryHistory.sort((a, b) => new Date(b.usedAt) - new Date(a.usedAt));
        setUserEntries(sortedEntries);
        }
    }).catch(err => {
      console.log(err);
    });

    axiosInstance.get('/medication/').then(res => {
      if(res.data && res.data.allMedications) {
        setPillMapping(prevMapping => ({
          ...prevMapping,
          ...res.data.allMedications.reduce((acc, med) => ({
            ...acc,
            [med._id]: med.name
          }), {})
        }));
      }
    }).catch(err => {
      console.log(err);
    });
  }, []); 



  return (
      <div style={{fontFamily: 'Montserrat', backgroundColor: "#ff6b6b", height: "100vh"}} className='flex flex-row items-center justify-center pt-3 text-center text-white'>
        <div
          style={{ width: "40%", minHeight: "80%" }}
          className="p-4 flex flex-col bg-white text-black rounded"
        >
          <h2> Past Dosages </h2>
          {userEntries.length === 0 && pillMapping != {} ? (
            <div>no entries to show</div>
          ) : (
            userEntries.map((entry) => (
              <div style={{background: "rgba(240,240,240)" ,boxShadow: "1px 1px 1px rgba(1,1,1 ,0.4)", alignItems: "center" ,justifyContent: "space-between"}} className="flex flex-row m-2 rounded pl-2">
                <div>{entry.usedAt.substring(0, 10)}</div>
                <div>{pillMapping[entry.medication]}</div>
                <Button style={{width: "15%"}} variant="danger" onClick={() => {
                  axiosInstance.delete(`/entry/${testUser}/${entry._id}`).then(res => {
                    location.reload();
                  })
                }}> Delete </Button>
              </div> 
            ))
          )}
        </div>
      </div>


      
  )
}

export default History
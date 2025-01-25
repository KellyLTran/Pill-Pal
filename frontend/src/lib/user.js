import React from 'react'
import axios from 'axios'

const user = () => {
  axios.get("http://localhost:3001/api/:userID").then(res => {
    console.log(res);
  }).catch(err => {
    console.log("error", err);
  })
}

export default user
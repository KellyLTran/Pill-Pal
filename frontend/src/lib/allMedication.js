import axios from 'axios'

const allMedication = () => {
  axios.get("http://localhost:3001/api/medication").then(res => {
    return 1;
  }).catch(err => {
    return 0;
  })
}

export default allMedication
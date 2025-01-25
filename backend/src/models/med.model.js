import mongoose from 'mongoose'

const medSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  dosage: {
    type: Number,
    required: true,
  },
  release: {
    type: String, 
    required: true,
  },
  sleep: {
    type: Number, 
    required: true,
  },
})
  
const Med = mongoose.model('Medicine', medItem);

export default Med;
import mongoose from 'mongoose'

const medicationSchema = new mongoose.Schema({
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
    enum: ["XR", "IR"]
  },

  sleep_m: {
    type: Number, 
    required: true,
  },

  concentration_map: {
    type: Map,
    required:true
  }

})
  
const Medication = mongoose.model('medication', medicationSchema);

export default Medication;
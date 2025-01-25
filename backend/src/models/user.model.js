import mongoose from 'mongoose'

const useSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  
  email: {
    type: String, 
    required: true
  }, 

  password: {
    type: String, 
    required: true
  },
  
  entryHistory: [{
    type: mongoose.Types.ObjectId,
    ref: 'Entry'
  }]
})

const User = mongoose.model('User', useSchema);

export default User;
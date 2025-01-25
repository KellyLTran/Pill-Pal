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
  }
})

const User = mongoose.model('User', userItem);

export default User;
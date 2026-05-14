import mongoose from 'mongoose'

const workerSchema = new mongoose.Schema({
  phone: String,
  name: String,
  skill: String,
  experience: String,
  location: String,
  salary: String,
  conversation: [{
    role: String,
    content: String 
  }],
  profileComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Worker', workerSchema)
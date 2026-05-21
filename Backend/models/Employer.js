import mongoose from 'mongoose'

const employerSchema = new mongoose.Schema({
  name: String,
  company: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Employer', employerSchema);
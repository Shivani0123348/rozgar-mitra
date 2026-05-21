import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Employer from '../models/Employer.js'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, company, phone, email, password } = req.body
    
    const exists = await Employer.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })
    
    const hashed = await bcrypt.hash(password, 10)
    const employer = await Employer.create({ name, company, phone, email, password: hashed })
    
    res.json({ message: 'Registration successful' })
  } catch (err) {
    res.status(500).json({ message: 'Error registering' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    const employer = await Employer.findOne({ email })
    if (!employer) return res.status(400).json({ message: 'Email not found' })
    
    const match = await bcrypt.compare(password, employer.password)
    if (!match) return res.status(400).json({ message: 'Wrong password' })
    
    const token = jwt.sign({ id: employer._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    
    res.json({ token, employer: { name: employer.name, company: employer.company } })
  } catch (err) {
    res.status(500).json({ message: 'Error logging in' })
  }
})

export default router;


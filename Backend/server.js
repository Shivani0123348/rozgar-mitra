import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.log('MongoDB error:', err))

  app.use('/webhook', webhookRoute);

app.get('/', (req, res) => {
  res.send('Rozgar Mitra backend chal raha hai!')
})

app.listen(3000, () => {
  console.log('Server chal raha hai port 3000 pe 🚀')
})
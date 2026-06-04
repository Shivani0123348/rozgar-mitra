import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import webhookRoute from './routes/webhook.js';
import cors from 'cors'
import Worker from './models/worker.js';
import authRoute from './routes/auth.js';
import authMiddleware from './middleware/auth.js';
dotenv.config();

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch((err) => console.log('MongoDB error:', err));

  app.use('/webhook', webhookRoute);
  app.use('/auth', authRoute);


app.get('/workers', authMiddleware, async (req, res) => {
  try {
    const workers = await Worker.find({ profileComplete: true })
    res.json(workers)
  } catch (err) {
    res.status(500).json({ error: 'Error fetching workers' })
  }
});

app.listen(5000, () => {
  console.log('Server chal raha hai port 5000 pe 🚀');   
});
















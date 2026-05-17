import express from 'express'
import twilio from 'twilio'
import { CohereClient } from 'cohere-ai'
import dotenv from 'dotenv'
import Worker from '../models/Worker.js'

dotenv.config()

const router = express.Router()

router.post('/', async (req, res) => {
  const cohere = new CohereClient({ token: process.env.COHERE_API_KEY })
  const userMsg = req.body.Body
  const userPhone = req.body.From

  try {
    let worker = await Worker.findOne({ phone: userPhone })
    if (!worker) {
      worker = await Worker.create({ phone: userPhone, conversation: [] })
    }

    worker.conversation.push({ role: 'USER', message: userMsg })

    const response = await cohere.chat({
      model: 'command-r-plus-08-2024',
      preamble: 'Tu Rozgar Mitra hai — UP ke mazdooron ka dost. Hindi mein baat kar, simple bhasha use kar. Worker se ek ek karke yeh poochh: 1. Naam 2. Kya kaam karta hai (skill) 3. Kitne saal ka experience 4. Kahan ka hai (city/district) 5. Kitni salary chahiye. Jab sab mil jaaye toh likho: Tera profile ready ho gaya PROFILE_COMPLETE. Friendly raho, encourage karo.',
      chatHistory:[],
      message: userMsg
    })

    const reply = response.text

    worker.conversation.push({ role: 'CHATBOT', message: reply })

    if (reply.includes('PROFILE_COMPLETE')) {
      worker.profileComplete = true
    }

    await worker.save()

    const twiml = new twilio.twiml.MessagingResponse()
    twiml.message(reply.replace('PROFILE_COMPLETE', ''))
    res.type('text/xml').send(twiml.toString())

  } catch (err) {
    console.error(err)
    res.status(500).send('Error')
  }
})

export default router;
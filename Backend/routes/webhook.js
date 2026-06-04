import express from 'express'
import twilio from 'twilio'
import { CohereClient } from 'cohere-ai'
import dotenv from 'dotenv'
import Worker from '../models/worker.js'

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

    const chatHistory = worker.conversation
      .filter(msg => msg.message && msg.message.trim() !== '')
      .map(msg => ({
        role: msg.role,
        message: msg.message
      }))

    const response = await cohere.chat({
      model: 'command-r-plus-08-2024',
      preamble: `Tu Rozgar Mitra hai — UP ke mazdooron ka dost. Hindi mein baat kar, simple bhasha use kar.
      Worker se ek ek karke yeh poochh:
      1. Naam
      2. Kya kaam karta hai (skill)
      3. Kitne saal ka experience
      4. Kahan ka hai (city/district)
      5. Kitni salary chahiye
      
      Jab sab mil jaaye toh exactly yeh format mein likho aur kuch mat likho baad mein:
      "Tera profile ready ho gaya [naam]! PROFILE_COMPLETE
      JSON:{"name":"[naam]","skill":"[skill]","experience":"[experience]","location":"[location]","salary":"[salary]"}"
      
      Friendly raho, encourage karo.`,
      chatHistory: chatHistory,
      message: userMsg
    })

    const reply = response.text

    worker.conversation.push({ role: 'USER', message: userMsg })
    worker.conversation.push({ role: 'CHATBOT', message: reply })

    if (reply.includes('PROFILE_COMPLETE')) {
      worker.profileComplete = true

      // JSON extract karo
      try {
        const jsonMatch = reply.match(/JSON:\s*({.*?})/s)
        if (jsonMatch) {
          const data = JSON.parse(jsonMatch[1])
          worker.name = data.name || ''
          worker.skill = data.skill || ''
          worker.experience = data.experience || ''
          worker.location = data.location || ''
          worker.salary = data.salary || ''
        }
      } catch (e) {
        console.log('JSON parse error:', e)
      }
    }

    await worker.save()

    // User ko sirf clean message bhejo
    const cleanReply = reply
      .replace('PROFILE_COMPLETE', '')
      .replace(/JSON:\s*{.*?}/s, '')
      .trim()

    const twiml = new twilio.twiml.MessagingResponse()
    twiml.message(cleanReply)
    res.type('text/xml').send(twiml.toString())

  } catch (err) {
    console.error(err)
    res.status(500).send('Error')
  }
})

export default router;

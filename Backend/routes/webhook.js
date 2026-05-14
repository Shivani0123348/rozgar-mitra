import express from 'express'
import twilio from 'twilio'
import OpenAI from 'openai'
import Worker from '../models/Worker.js'

const router = express.Router()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

router.post('/', async (req, res) => {
  const userMsg = req.body.Body
  const userPhone = req.body.From

  try {
    // Worker dhundo ya naya banao
    let worker = await Worker.findOne({ phone: userPhone })
    if (!worker) {
      worker = await Worker.create({ phone: userPhone, conversation: [] })
    }

    // Conversation history mein add karo
    worker.conversation.push({ role: 'user', content: userMsg })

    // OpenAI call
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Tu Rozgar Mitra hai — UP ke mazdooron ka dost.
          Hindi mein baat kar, simple bhasha use kar.
          Worker se ek ek karke yeh poochh:
          1. Naam
          2. Kya kaam karta hai (skill)
          3. Kitne saal ka experience
          4. Kahan ka hai (city/district)
          5. Kitni salary chahiye
          
          Jab sab mil jaaye toh likho:
          "Tera profile ready ho gaya [naam]! PROFILE_COMPLETE"
          
          Friendly raho, encourage karo.`
        },
        ...worker.conversation
      ]
    })

    const reply = aiResponse.choices[0].message.content

    // Save karo
    worker.conversation.push({ role: 'assistant', content: reply })

    if (reply.includes('PROFILE_COMPLETE')) {
      worker.profileComplete = true
    }

    await worker.save()

    // WhatsApp reply bhejo
    const twiml = new twilio.twiml.MessagingResponse()
    twiml.message(reply.replace('PROFILE_COMPLETE', ''))
    res.type('text/xml').send(twiml.toString())

  } catch (err) {
    console.error(err)
    res.status(500).send('Error')
  }
})

export default router
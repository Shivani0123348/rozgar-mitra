import express from "express";
import twilio from "twilio";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("🔥 WEBHOOK HIT");
  console.log(req.body);

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message("Rozgar Mitra working ✅");

  res.type("text/xml");
  res.send(twiml.toString());
});

export default router;

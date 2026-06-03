# 🤝 Rozgar Mitra

AI-powered WhatsApp job platform for Hindi-speaking daily wage workers in Uttar Pradesh.

## 🔥 Problem
Daily wage workers (painters, plumbers, laborers) in UP find jobs through word of mouth or WhatsApp groups. No structured platform exists for them. They don't use LinkedIn or job portals.

## 💡 Solution
Worker apne WhatsApp se Hindi mein baat karta hai. AI conversation se automatically resume ban jaata hai. Employers React dashboard pe candidates dekhte hain aur directly WhatsApp pe contact karte hain.

## 🎯 How It Works
1. Worker Rozgar Mitra ka WhatsApp number save karta hai
2. "Namaste" bhejta hai — AI Hindi mein reply karta hai
3. AI 5 simple sawaal poochta hai — naam, skill, experience, location, salary
4. Profile automatically MongoDB mein save ho jaati hai
5. Employer dashboard pe login karta hai
6. Workers ko skill se search karta hai
7. Direct WhatsApp pe contact karta hai

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI | Cohere AI (command-r-plus) |
| WhatsApp | Twilio API |
| Auth | JWT + bcrypt |
| Tunnel | Cloudflare Tunnel |

## 📱 Features
- ✅ WhatsApp bot — Hindi conversational AI
- ✅ Auto resume generation from conversation
- ✅ Employer dashboard with search & filter
- ✅ JWT based employer authentication
- ✅ Direct WhatsApp contact button
- ✅ Real-time worker profiles

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Twilio account
- Cohere API key

### Backend Setup
```bash
cd Backend
npm install
```

Create `.env` file:
```
MONGODB_URI=your_mongodb_uri
COHERE_API_KEY=your_cohere_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+14155238886
JWT_SECRET=your_jwt_secret
PORT=5000
```

```bash
node server.js
```

### Frontend Setup
```bash
cd frontend2
npm install
npm start
```

### WhatsApp Tunnel
```bash
npx cloudflared tunnel --url http://localhost:5000
```
Add generated URL to Twilio Sandbox settings as webhook.

## 📊 Project Structure
rozgar-mitra/
├── Backend/
│   ├── models/
│   │   ├── Worker.js
│   │   └── Employer.js
│   ├── routes/
│   │   ├── webhook.js
│   │   └── auth.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend2/
│   └── src/
│       ├── App.js
│       ├── Login.js
│       └── Register.js
└── README.md


# future Scope
## 🎯 Target Users
- **Workers** — Daily wage workers in UP (painters, plumbers, electricians, construction workers)
- **Employers** — Local businesses, contractors, households looking for skilled workers

## 🔮 Future Scope
- Deploy on Railway + Vercel
- WhatsApp Business API for production
- Job matching algorithm
- Worker ratings system
- Multi-language support (Bhojpuri, Awadhi)
- Mobile app for employers

## 👨‍💻 Developer
Built by a MERN stack developer from Gorakhpur, UP — solving a real problem for local workers.


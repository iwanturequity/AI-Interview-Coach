# 🧠 AI Interview Coach

A smart, interactive platform to help users practice coding interviews with real-time feedback powered by Gemini AI. This project simulates technical interviews, making preparation smoother and more efficient.

## 🔥 Features

- 🔐 User Authentication using Firebase Auth
- 🤖 AI-based feedback with Gemini API
- 🗣️ Interview mode to explain your logic to Gemini (AI will validate it)
- 🕒 Interview timer system
- 🌐 Hosted on Vercel

## 🚀 How it works (User Flow)

1. **Sign Up / Login**: User logs into the app using email.
3. **Interview Mode**: 
   - Start a mock interview.
   - Explain your logic to Gemini.
   - Gemini checks and responds with helpful feedback.
4. **Practice & Learn**: Refine your approach and become interview-ready.

## 🛠️ Tech Stack

- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend / DB**: Firebase Firestore + Firebase Auth
- **AI Integration**: Gemini API
- **Deployment**: Vercel


## ⚙️ Setup Instructions

1. Clone the repo  
   ```bash
   git clone https://github.com/iwanturequity/AI-Interview-Coach.git
   cd AI-Interview-Coach

Setup .env file 
```bash
    VITE_APIKEY=your_firebase_key
    VITE_AUTHDOMAIN=your_auth_domain
    VITE_PROJECTID=your_project_id
    VITE_STORAGEBUCKET=your_storage_bucket
    VITE_MESSAGINGSENDERID=your_sender_id
    VITE_APPID=your_app_id
    VITE_MEASUREMENTID=your_measurement_id
    VITE_GEMINI_API_KEY=your_gemini_api_key

    npm run dev


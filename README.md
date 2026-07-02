# Moodify: AI-Powered Mood Music Player 🎵🤖

Moodify is an interactive, premium web application that detects your facial expressions in real-time using your device's camera and plays music tailored to your current mood. Powered by MediaPipe Face Landmarking on the frontend and a Node.js/Express server on the backend.

---

## 🌟 Key Features

- **Real-Time Expression Recognition**: Utilizes Google MediaPipe Face Landmarker on the client side to continuously track facial features and identify emotions (`happy`, `sad`, `surprised`, and `neutral`).
- **Dynamic Autoplay & Restart**: Playback starts automatically as soon as a mood is detected and confirmed. The player resets and restarts tracks seamlessly even if the same song is picked consecutively.
- **Randomized Playlists**: Queries match documents by mood and skip to a random index, ensuring different songs are served for the same emotion.
- **Secure JWT Session Management**: Features secure cookies and Token Blacklisting via a **Redis** cache for robust user logouts.
- **ImageKit Storage Integration**: Handles audio files and album cover art uploads efficiently using ImageKit.
- **Curated Glassmorphism Design**: Sleek, modern, and dark-themed UI built using Sass (SCSS) and custom styling.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Sass / SCSS, Vanilla CSS
- **AI/Vision**: `@mediapipe/tasks-vision`
- **Routing**: `react-router`
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Caching**: Redis (via ioredis)
- **File Uploads**: ImageKit SDK, Multer, `node-id3` (metadata parser)
- **Auth**: JSON Web Tokens (JWT), `bcryptjs` (password hashing), Cookie Parser

---

## 📁 Directory Structure

```text
Moodify/
├── Backend/                 # Express backend API
│   ├── src/
│   │   ├── config/          # Database, cache, and seed scripts
│   │   ├── controllers/     # Auth and Song controllers
│   │   ├── middlewares/     # Auth and Multer uploads middlewares
│   │   ├── models/          # Mongoose Schemas (User, Song, Blacklist)
│   │   ├── routes/          # Express API route endpoints
│   │   └── services/        # Storage uploads (ImageKit)
│   ├── server.js            # Node entry point (with Global DNS set)
│   └── .env                 # Environment secrets
│
├── Frontend/                # Vite React app
│   ├── src/
│   │   ├── features/
│   │   │   ├── Expression/  # MediaPipe webcam & detection logic
│   │   │   ├── auth/        # Login, Register, Auth Context
│   │   │   ├── home/        # Dashboard layout, Song Context, Player
│   │   │   └── shared/      # Global SCSS / base styles
│   │   ├── App.jsx          # React app entry point
│   │   ├── app.routes.jsx   # App router endpoints
│   │   └── main.jsx
│   └── package.json
```

---

## 🚀 Quick Start Setup

### 1. Backend Configuration
Navigate to the `Backend` directory and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory containing:
```env
MONGODB_URL=YOUR_MONGODB_ATLAS_URI
REDIS_HOST=YOUR_REDIS_HOST
REDIS_PORT=YOUR_REDIS_PORT
REDIS_PASSWORD=YOUR_REDIS_PASSWORD
JWT_SECRET=YOUR_SECURE_JWT_SECRET
IMAGE_PUBLIC_KEY=YOUR_IMAGEKIT_PUBLIC_KEY
IMAGE_PRIVATE_KEY=YOUR_IMAGEKIT_PRIVATE_KEY
IMAGE_URL_ENDPOINT=YOUR_IMAGEKIT_URL_ENDPOINT
```

### 2. Seed the Database
To populate MongoDB with the initial list of songs (3 songs per mood, 12 in total):
```bash
npm run seed
```
*(or run `node src/config/seed_songs.js`)*

### 3. Run Backend Server
Start the Express server with Nodemon:
```bash
npm run dev
```
The server will run on [http://localhost:3000](http://localhost:3000).

---

### 4. Frontend Configuration
Navigate to the `Frontend` directory and install packages:
```bash
cd ../Frontend
npm install
```

### 5. Run Frontend Dev Server
Start the Vite dev server:
```bash
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your web browser.

---

## 🧪 How to Use

1. Register an account and log in.
2. Allow webcam access.
3. Position your face in the camera frame. The detector will show your real-time emotion under the feed (`neutral`, `happy`, `sad`, `surprised`).
4. Click **Detect expression** to fetch and play a song matching your emotion!

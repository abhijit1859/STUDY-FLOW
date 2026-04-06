# Study Pro

A comprehensive full-stack study and productivity platform designed to help students organize notes, track study sessions, manage resources, and enhance their learning experience.

## 📋 Project Overview

Study Pro is a monorepo containing three main components:
- **Client**: React + TypeScript frontend with Vite
- **Server**: Node.js + Express backend with TypeScript
- **Transcript Generator**: Python service for processing transcripts

## 🏗️ Project Structure

```
study-pro/
├── client/                 # React frontend application
├── server/                 # Node.js backend application
└── trans-generator/        # Python transcript processing service
```

## 🚀 Features

### Client
- **Rich Text Editor**: Advanced note-taking with editor plugins
- **Whiteboard**: Visual note-taking and canvas drawing
- **Study Tools**: Pomodoro timer
- **Resource Management**: PDF viewer, saved links, playlist management
- **Theme Support**: Dark/light theme switching
- **Authentication**: User authentication with Clerk integration

### Server
- **User Management**: Registration, authentication, and user data
- **Notes API**: Create, read, update, delete notes
- **Document Processing**: PDF loading and processing
- **AI Services**: Gemini AI integration for smart features



### Transcript Generator
- Automated transcript processing
- Integration with the backend services

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Build tool
- **Zustand** - State management
- **TailwindCSS** - Styling
- **Clerk** - Authentication

### Backend
- **Node.js** with Express
- **TypeScript**
- **MongoDB** - Database
- **Gemini AI** - AI capabilities
- **LangChain** - LLM orchestration

### Other
- **Python** - Transcript generation service

## 📦 Installation

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB
- Clerk API keys
- Gemini API keys

### Client Setup
```bash
cd client
npm install
npm run dev
```

### Server Setup
```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### Transcript Generator Setup
```bash
cd trans-generator
pip install -r requirements.txt
python main.py
```

## 🔑 Environment Variables

Create `.env` files in each directory with:

**Client (.env)**
- VITE_API_URL
- VITE_CLERK_PUBLISHABLE_KEY

**Server (.env)**
- DATABASE_URL
- CLERK_SECRET_KEY
- GEMINI_API_KEY
- PORT

**Transcript Generator (.env)**
- API_ENDPOINT
- API_KEY

## 📖 Available Pages

- **Home**: Dashboard landing page
- **Notes**: Note-taking and management
- **Canvas**: Whiteboard for visual notes
- **Saved**: Bookmarked resources and links
- **Chat**: Chat interface
- **Pomodoro**: Study timer
- **PDF Viewer**: Document viewing
- **Player**: Media playback

## 🔌 API Routes

### User Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Notes Routes
- `GET /api/notes` - Fetch all notes
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Playlist Routes
- `GET /api/playlists` - Fetch playlists
- `POST /api/playlists` - Create playlist

### Session Routes
- `POST /api/sessions` - Create study session
- `GET /api/sessions` - Fetch sessions



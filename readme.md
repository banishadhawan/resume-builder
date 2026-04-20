# Resume Builder (MERN + AI)

Full-stack resume builder with:

- React + Vite frontend
- Node.js + Express backend
- MongoDB persistence
- JWT authentication
- AI-assisted resume parsing and text enhancement
- Public resume sharing

## Project Structure

```
resume builder/
	client/   # React app (Vite)
	server/   # Express API
```

## Features

- User registration and login
- Dashboard with create, upload, rename, and delete resume
- Resume builder with sections:
	- Personal Info
	- Professional Summary
	- Experience
	- Education
	- Projects
	- Skills
- Template and accent color selection
- AI enhancement for professional summary and job descriptions
- Upload existing PDF resume and extract structured data via AI
- Save and update resume data in MongoDB
- Public/private resume visibility toggle
- Shareable public resume URL: `/view/:resumeId`
- Browser print/download from preview

## Tech Stack

### Frontend

- React 19
- React Router
- Redux Toolkit + React Redux
- Axios
- Tailwind CSS
- Lucide React icons
- React Hot Toast

### Backend

- Node.js (ESM)
- Express 5
- MongoDB + Mongoose
- JWT + bcrypt
- Multer
- OpenAI SDK
- ImageKit SDK

## API Overview

Base URL (backend):

- `http://localhost:3000` (default)

### User Routes

- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/data` (protected)
- `GET /api/users/resumes` (protected)

### Resume Routes

- `POST /api/resumes/create` (protected)
- `PUT /api/resumes/update` (protected, multipart supported)
- `DELETE /api/resumes/delete/:resumeId` (protected)
- `GET /api/resumes/get/:resumeId` (protected)
- `GET /api/resumes/public/:resumeId` (public)

### AI Routes

- `POST /api/ai/enhance-pro-sum` (protected)
- `POST /api/ai/enhance-job-desc` (protected)
- `POST /api/ai/upload-resume` (protected)

## Environment Variables

Create these files before running:

- `server/.env`
- `client/.env` (optional if using default backend URL)

### server/.env

```
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>
JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_openai_api_key
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Notes:

- Backend appends database name `resume-builder` to `MONGODB_URI`.
- Auth middleware accepts either `Authorization: Bearer <token>` or raw token.

### client/.env

```
VITE_BASE_URL=http://localhost:3000
```

If `VITE_BASE_URL` is not provided, frontend defaults to `http://localhost:3000`.

## Local Setup

### 1) Install dependencies

From project root:

```
cd client
npm install

cd ../server
npm install
```

### 2) Run backend

```
cd server
npm run server
```

Alternative:

```
npm start
```

### 3) Run frontend

In another terminal:

```
cd client
npm run dev
```

Frontend default URL:

- `http://localhost:5173`

## Build

### Frontend production build

```
cd client
npm run build
```

Preview build locally:

```
npm run preview
```

## Authentication Flow

1. User logs in or registers.
2. Backend returns JWT token.
3. Frontend stores token in localStorage.
4. Protected API calls send token in `Authorization` header.

## Share Flow

1. In builder, set resume visibility to Public.
2. Click Share.
3. Open generated link `/view/:resumeId`.
4. Preview page fetches data from public resume API endpoint.

## Git Ignore Setup

Ignore rules are split per app:

- `client/.gitignore`
- `server/.gitignore`

Root `.gitignore` contains workspace-level rules.

## Important Notes

- Keep `.env` files private and never commit secrets.
- API URL must point frontend to running backend.
- Public sharing only works when resume `public` flag is true.

## Suggested Future Improvements

- Add validation and sanitization for all input fields.
- Add unit and integration tests (frontend + backend).
- Add role-based and rate-limit protections.
- Improve chunk splitting for frontend production bundle.
- Add Docker and CI pipeline for deployment.

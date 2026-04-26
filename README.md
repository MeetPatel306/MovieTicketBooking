# 🎬 MovieTicketBooking
### Online Movie Ticket Booking Platform

MovieTicketBooking is a full-stack web app for browsing movies, selecting theaters and showtimes, choosing seats in real time, and completing ticket bookings with payment details.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| **Frontend (Vercel)** | https://movie-ticket-booking-liart-beta.vercel.app |
| **Backend (Render)** | https://movieticketbooking-2.onrender.com |
| **Database (MongoDB Atlas)** | `movieproject` on `cluster0.mbyt2md.mongodb.net` |

---

## ✨ Features

- User signup with OTP verification
- User login with OTP verification
- Auto login after signup
- Movie listing and movie details pages
- Theater, date, and time slot selection
- Real-time seat availability checks
- Seat conflict prevention during booking
- Booking history and profile dashboard
- Ticket download support from profile
- Booking statistics (tickets, spend, recent bookings)
- Payment via Card or UPI

---

## ⚙️ Workflow

```text
User Signup/Login
      │
      ▼
Browse Movies
      │
      ▼
Select Movie + Theater + Date + Time
      │
      ▼
Live Seat Availability Check
      │
      ▼
Choose Seats
      │
      ▼
Payment (Card/UPI)
      │
      ▼
Booking Stored in MongoDB
      │
      ▼
View Booking History in Profile
```

---

## 🏗 System Architecture

```text
             ┌────────────────────────────────────┐
             │         Frontend (Vercel)          │
             │  React + Vite SPA                  │
             │  movie-ticket-booking-liart-beta   │
             │  .vercel.app                       │
             └─────────────┬──────────────────────┘
                           │ HTTP API
                           ▼
             ┌────────────────────────────────────┐
             │         Backend (Render)           │
             │  Node + Express                    │
             │  movieticketbooking-2.onrender.com │
             └─────────────┬──────────────────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
     MongoDB Atlas                 Booking + Payment
     (Users, Auth,                  Route Services
      Bookings, Payments)
```

---

## 🛠 Tech Stack

**Frontend**
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM

**Backend**
- Node.js
- Express.js
- Mongoose
- bcrypt
- CORS
- dotenv

**Database**
- MongoDB Atlas (`movieproject`)

---

## 📂 Project Structure

```text
MovieTicketBooking
│
├── src
│   ├── components
│   │   ├── Footer.jsx
│   │   ├── MovieCard.jsx
│   │   └── Navbar.jsx
│   ├── contexts
│   │   ├── AuthContext.jsx
│   │   └── MovieContext.jsx
│   ├── pages
│   │   ├── Booking.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── Movies.jsx
│   │   ├── Profile.jsx
│   │   ├── Signup.jsx
│   │   ├── Theaters.jsx
│   │   └── UpcomingReleases.jsx
│   └── App.jsx
│
├── backend
│   ├── config
│   │   └── database.js
│   ├── models
│   │   ├── BookingData.js
│   │   ├── LoginData.js
│   │   ├── PaymentData.js
│   │   └── SignupData.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── bookingRoutes.js
│   ├── package.json
│   └── server.js
│
├── vercel.json
└── README.md
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js >= 14
- MongoDB Atlas account (or local MongoDB)

### Backend

```bash
cd backend
npm install
npm start
```

Backend runs at: `http://localhost:5000`

### Frontend

```bash
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend — create `backend/.env`

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mbyt2md.mongodb.net/movieproject?retryWrites=true&w=majority
JWT_SECRET=moviebookingsecret
FRONTEND_URLS=http://localhost:5173,http://127.0.0.1:5173,https://movie-ticket-booking-liart-beta.vercel.app
PORT=5000
NODE_ENV=development
```

### Frontend — create `.env` in root

```env
VITE_API_BASE_URL=https://movieticketbooking-2.onrender.com
```

---

## 📡 API Documentation

Base URL: `https://movieticketbooking-2.onrender.com/api`

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Create a new user account |
| POST | `/login` | Authenticate user and log login activity |
| GET | `/profile/:email` | Fetch user profile by email |

### Booking

| Method | Endpoint | Description |
|---|---|---|
| POST | `/create-booking` | Create booking + payment with seat conflict check |
| POST | `/get-show-bookings` | Fetch all bookings for a specific show |
| POST | `/check-seat-availability` | Check if requested seats are available |
| GET | `/user-bookings/:login_name` | Fetch all bookings for a user |
| GET | `/booking-details/:bookingId` | Get booking and payment details |
| GET | `/payment-details/:bookingId` | Fetch safe payment metadata |
| GET | `/booking-stats/:login_name` | Get booking statistics for a user |
| PATCH | `/cancel-booking/:bookingId` | Cancel a booking |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check server and DB status |

---

## 🚀 Available Scripts

### Frontend (root)

```bash
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run preview    # Preview build
npm run lint       # Run ESLint
```

### Backend (`backend/`)

```bash
npm start          # Start with node
npm run dev        # Start with nodemon (hot reload)
```

---

## 👨‍💻 Author

**Meet Patel**
- GitHub: https://github.com/MeetPatel306
- Project: https://github.com/MeetPatel306/MovieTicketBooking

---

## ⭐ Support

If you like this project, please star the repository and share your feedback!
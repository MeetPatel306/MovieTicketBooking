# 🎬 MovieTicketBooking
### Online Movie Ticket Booking Platform

MovieTicketBooking is a full-stack web app for browsing movies, selecting theaters and showtimes, choosing seats in real time, and completing ticket bookings with payment details.

---

# 🌐 Live Demo

**Frontend (Local):** `http://localhost:5173`
**Backend (Local):** `http://localhost:5000`

<<<<<<< HEAD
**Repository:** `https://github.com/<MeetPatel306>/MovieTicketBooking`
=======
>>>>>>> f42d815 (backend ready)
---

# ✨ Features

- User signup/login with OTP flow
- Movie listing and movie details pages
- Theater, date, and time slot selection
- Real-time seat availability checks
- Seat conflict prevention during booking
- Booking history and profile dashboard
- Ticket download support from profile
- Booking statistics (tickets, spend, recent bookings)

---

# ⚙️ Workflow

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

# 🏗 System Architecture

```text
             ┌────────────────────┐
             │      Frontend      │
             │ React + Vite SPA   │
             └─────────┬──────────┘
                       │ HTTP API
                       ▼
             ┌────────────────────┐
             │      Backend       │
             │   Node + Express   │
             └─────────┬──────────┘
                       │
            ┌──────────┴──────────┐
            ▼                     ▼
     MongoDB (Users,         Booking + Payment
      Auth, Bookings)          Route Services
```

---

# 🛠 Tech Stack

**Frontend**
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router

**Backend**
- Node.js
- Express.js
- Mongoose
- bcrypt
- CORS

**Database**
- MongoDB (`movieproject`)

---

# 📂 Project Structure

```text
MovieTicketBooking
│
├── src
│   ├── components
│   ├── contexts
│   ├── pages
│   └── App.jsx
│
├── backend
│   ├── config
│   ├── models
│   ├── routes
│   └── server.js
│
└── README.md
```

---

# 📡 API Documentation

Base URL: `http://localhost:5000/api`

### Authentication

**POST** `/signup`  
Create a new user account.

**POST** `/login`  
Authenticate user and log login activity.

**GET** `/profile/:email`  
Fetch user profile by email.

### Booking

**POST** `/create-booking`  
Create booking + payment record with seat conflict checks.

**POST** `/get-show-bookings`  
Fetch all bookings for a specific show (seat status).

**POST** `/check-seat-availability`  
Check whether requested seats are available.

**GET** `/user-bookings/:login_name`  
Fetch all bookings for a user.

**GET** `/booking-details/:bookingId`  
Get booking and payment details.

**GET** `/payment-details/:bookingId`  
Fetch safe payment metadata.

**GET** `/booking-stats/:login_name`  
Get booking statistics for a user.

**PATCH** `/cancel-booking/:bookingId`  
Cancel booking (if allowed).

---

## Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs at: `http://localhost:5000`

> Current DB connection is configured in `backend/config/database.js` as:
> `mongodb://127.0.0.1:27017/movieproject`

---

# 🚀 Available Scripts

## Frontend (root)

- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Run ESLint

## Backend (`backend`)

- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend with node

---

# 👨‍💻 Authors

<<<<<<< HEAD
**Your Name**  
`https://github.com/<MeetPatel306>`

=======
>>>>>>> f42d815 (backend ready)
---

# ⭐ Support

<<<<<<< HEAD
If you like this project, please star the repository and share your feedback.
=======
If you like this project, please star the repository and share your feedback.
>>>>>>> f42d815 (backend ready)

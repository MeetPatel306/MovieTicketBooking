require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- DB CONNECT ---------------- */
connectDB();

/* ---------------- CORS ---------------- */

const allowedOrigins = (
 process.env.FRONTEND_URLS ||
 "http://localhost:5173,http://127.0.0.1:5173,https://movie-ticket-booking-liart-beta.vercel.app"
)
.split(",")
.map(o => o.trim());

app.use(
 cors({
   origin: function(origin, callback){
      if(!origin) return callback(null,true);

      if(allowedOrigins.includes(origin)){
         return callback(null,true);
      }

      return callback(new Error("CORS blocked"));
   },
   credentials:true,
   methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
   allowedHeaders:["Content-Type","Authorization"]
 })
);

/* ---------------- MIDDLEWARE ---------------- */

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({
 extended:true,
 limit:"10mb"
}));

app.set("trust proxy", true);

/* Request logs */

app.use((req,res,next)=>{
 console.log(
 `${new Date().toISOString()} ${req.method} ${req.originalUrl}`
 );
 next();
});


/* ---------------- ROUTES ---------------- */

app.use("/api",authRoutes);
app.use("/api",bookingRoutes);


/* ---------------- HEALTH ---------------- */

app.get("/",(req,res)=>{
 res.json({
   success:true,
   message:"Movie Ticket Booking API Running"
 });
});

app.get("/health",(req,res)=>{
 res.json({
   success:true,
   db:
   mongoose.connection.readyState===1
   ? "connected"
   : "disconnected",
   env:process.env.NODE_ENV
 });
});

app.get("/api/test-db",(req,res)=>{
 res.json({
   state:mongoose.connection.readyState,
   dbName:mongoose.connection.name
 });
});


/* ---------------- ERROR HANDLER ---------------- */

app.use((err,req,res,next)=>{
 console.error(err);

 if(err.name==="ValidationError"){
   return res.status(400).json({
      success:false,
      message:"Validation Error"
   });
 }

 if(err.code===11000){
   return res.status(409).json({
      success:false,
      message:"Duplicate record"
   });
 }

 res.status(500).json({
   success:false,
   message:err.message || "Server error"
 });
});


/* ---------------- 404 ---------------- */

app.use("*",(req,res)=>{
 res.status(404).json({
   success:false,
   message:"Route not found"
 });
});


/* ---------------- SERVER ---------------- */

app.listen(PORT,()=>{
 console.log(`Server running on ${PORT}`);
});


/* graceful shutdown */

process.on("SIGINT", async ()=>{
 await mongoose.connection.close();
 process.exit(0);
});

process.on("SIGTERM", async ()=>{
 await mongoose.connection.close();
 process.exit(0);
});

module.exports=app;
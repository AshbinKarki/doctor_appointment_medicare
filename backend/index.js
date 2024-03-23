import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import doctorRoute from './Routes/doctor.js';
import reviewRoute from './Routes/review.js';
import bookingRoute from './Routes/booking.js';
import  adminRoute from './Routes/admin.js';




dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get('/', (req, res) => {
  res.send('App is working');
});



 

//database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connection successful!!!');
  } catch (err) {
    console.log('MongoDB connection failed!!! ');
  }
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute); //authorization route path
app.use('/api/v1/users', userRoute); //user route path
app.use('/api/v1/doctors', doctorRoute); //doctor route path
app.use('/api/v1/reviews', reviewRoute); //review route path
app.use('/api/v1/bookings', bookingRoute); //review route path
app.use('/api/v1/admin' , adminRoute);






app.listen(port, () => {
  connectDB();
  console.log('Server is running on port' + port);
});
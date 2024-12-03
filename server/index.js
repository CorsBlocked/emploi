require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();






app.use(
  cors({
    origin: ["http://localhost:3000/"],
    methods: ["GET", "POST", 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());





mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));
require('dotenv').config();

const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());

// DB connection
const connectDB = require("./config/database");
connectDB();

// Routes from Routes folder
const authRoutes = require("./Routes/userRoute");
const sweetsRoutes = require("./Routes/sweetsRoute");


app.use(cors())
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);
app.get('/', (req, res) => {
  res.send("Welcome to sweet shop management system!");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

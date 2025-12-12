require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

// DB connection
const connectDB = require("./config/database");
connectDB();

// Routes from Routes folder
const authRoutes = require("./Routes/userRoute");


app.use("/api/auth", authRoutes);
app.get('/', (req, res) => {
  res.send("Hello from Express!");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

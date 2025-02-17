require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes")


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());


// Routes
app.use("/auth", authRoutes);
app.use("/api",noteRoutes)
app.use("/user",userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
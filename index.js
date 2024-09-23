require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const profileRoutes = require('./routes/profile');
const updateRoutes = require('./routes/update');
const commentRoutes = require('./routes/comment');
const taskRoutes = require('./routes/task');
const notificationRoutes = require('./routes/notification');

const cloudinary = require('cloudinary').v2;

// database connection
connection();

// Configure Cloudinary
cloudinary.config({
    
    cloud_name:  process.env.CN,
    api_key: process.env.AK,
    api_secret: process.env.AS
});


// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/update", updateRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/notification", notificationRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
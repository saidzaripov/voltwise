const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const uploadRoute = require('./routes/upload');
const fs = require("fs");

// Create /uploads if it doesn't exist
const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = express();
const corsOptions = {
  origin: "*", // or whitelist only Replit origin
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());
app.use('/api/upload', uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

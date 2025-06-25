const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const uploadRoute = require('./routes/upload');
const path = require('path');
const fs = require('fs');

const app = express();

// ✅ Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure CORS to allow frontend domains
app.use(cors({
  origin: [
    'https://voltwise-production.up.railway.app',
    'https://voltwise-developerteste5.replit.dev'
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
}));

// ✅ Routes
app.use('/api/upload', uploadRoute);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('Voltwise backend is running.');
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

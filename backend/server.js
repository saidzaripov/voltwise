const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const uploadRoute = require('./routes/upload');
const path = require('path');
const fs = require('fs');

const app = express();

// ✅ Create /uploads dir if missing
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
}));

app.use('/api/upload', uploadRoute);

// ✅ Optional: Add base route so GET / returns OK
app.get('/', (req, res) => {
  res.send('Voltwise backend is running.');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

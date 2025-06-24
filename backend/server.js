const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const uploadRoute = require('./routes/upload');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/api/upload', uploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

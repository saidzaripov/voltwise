const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { parseEnergyData } = require('../controllers/parseEnergyData');

router.post('/', async (req, res) => {
  console.log("Upload route hit");

  if (!req.files || !req.files.energyBill) {
    console.log("No file uploaded");
    return res.status(400).send('No file uploaded.');
  }

  const bill = req.files.energyBill;

  const uploadDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const uploadPath = path.join(uploadDir, bill.name);
  console.log(`Received file: ${bill.name}, size: ${bill.size} bytes`);
  console.log(`Saving to: ${uploadPath}`);

  try {
    await bill.mv(uploadPath);
    const parsedText = await parseEnergyData(uploadPath);
    res.json({ success: true, data: parsedText });
  } catch (error) {
    console.error("Upload or parsing failed:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const path = require('path');
const { parseEnergyData } = require('../controllers/parseEnergyData');

router.post('/', async (req, res) => {
  if (!req.files || !req.files.energyBill) {
    return res.status(400).send('No file uploaded.');
  }
  const bill = req.files.energyBill;
  const uploadPath = path.join(__dirname, '..', 'uploads', bill.name);
  await bill.mv(uploadPath);
  try {
    const parsedText = await parseEnergyData(uploadPath);
    res.json({ success: true, data: parsedText });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
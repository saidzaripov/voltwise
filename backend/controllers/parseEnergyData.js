const Tesseract = require('tesseract.js');

exports.parseEnergyData = async (filePath) => {
  try {
    const result = await Tesseract.recognize(filePath, 'eng');
    return result.data.text;
  } catch (error) {
    throw new Error("OCR parsing failed: " + error.message);
  }
};
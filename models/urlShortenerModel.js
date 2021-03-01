const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
  },
});

const urlShortener = mongoose.model("urlShortener", shortUrlSchema);

module.exports = urlShortener;

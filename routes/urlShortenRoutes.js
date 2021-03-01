const express = require("express");
const urlShortenerController = require("../controller/urlShortenerController");

const router = express.Router();

router.post("/", urlShortenerController.postUrl);
router.get("/:shortId", urlShortenerController.getShortUrl);

module.exports = router;

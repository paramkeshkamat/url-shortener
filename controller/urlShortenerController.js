const shortid = require("shortid");
const isValidUrl = require("valid-url");
const ShortUrl = require("../models/urlShortenerModel");

const postUrl = async (req, res) => {
  const { url } = req.body;
  if (isValidUrl.isUri(url)) {
    try {
      const longUrl = await ShortUrl.findOne({ longUrl: url });
      if (longUrl) {
        res.render("index", {
          shortUrl: longUrl.shortUrl,
          longUrl: longUrl.longUrl,
        });
      } else {
        const newShortId = shortid.generate();
        const shortUrl = new ShortUrl({
          longUrl: url,
          shortUrl: `${req.protocol}s://${req.headers.host}/${newShortId}`,
          shortId: newShortId,
        });
        const result = await shortUrl.save();
        res.render("index", {
          shortUrl: result.shortUrl,
          longUrl: result.longUrl,
        });
      }
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.send("Not a valid url");
  }
};

const getShortUrl = async (req, res) => {
  const { shortId } = req.params;
  try {
    const url = await ShortUrl.findOne({ shortId });
    console.log(url);
    if (url) {
      res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    res.status(500).json("Server error");
  }
};

module.exports = { postUrl, getShortUrl };

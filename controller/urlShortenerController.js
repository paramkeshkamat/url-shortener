const shortid = require("shortid");
const isValidUrl = require("valid-url");
const ShortUrl = require("../models/urlShortenerModel");

const postUrl = async (req, res) => {
  const { url } = req.body;
  if (isValidUrl.isUri(url)) {
    try {
      const longUrl = await ShortUrl.findOne({ longUrl: url });
      if (longUrl) {
        // res.json(longUrl);
        res.render("index", {
          shortUrl: longUrl.shortUrl,
          longUrl: longUrl.longUrl,
        });
        res.render();
      } else {
        const newShortId = shortid.generate();
        const shortUrl = new ShortUrl({
          longUrl: url,
          shortUrl: `${req.headers.host}/${newShortId}`,
          shortId: newShortId,
        });
        const result = await shortUrl.save();
        // res.json(result);
        res.render("index", {
          shortUrl: result.shortUrl,
          longUrl: result.longUrl,
        });
      }
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.send("Not a valid email");
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
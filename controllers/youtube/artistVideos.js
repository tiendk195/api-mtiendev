const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
router.get("/:artist", (req, res) => {
  const { artist } = req.params;
  const filePath = path.join(__dirname, `../../database/${artist}.json`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const artistVideos = JSON.parse(data);
    res.json(artistVideos);
  });
});

module.exports = router;

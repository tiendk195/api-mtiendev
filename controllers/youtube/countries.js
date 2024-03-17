const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
router.get("/:country", (req, res) => {
  const { country } = req.params;
  const filePath = path.join(
    __dirname,
    `../../database/country/${country}.json`
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const countryVideos = JSON.parse(data);
    res.json(countryVideos);
  });
});

module.exports = router;

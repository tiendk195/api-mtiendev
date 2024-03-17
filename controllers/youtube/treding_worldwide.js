const express = require("express");
const fs = require("fs");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const specs = require("../swagger");

router.get("/", (req, res) => {
  fs.readFile("././database/treding_worldwide.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const topVideos = JSON.parse(data);
    res.json(topVideos);
  });
});

module.exports = router;

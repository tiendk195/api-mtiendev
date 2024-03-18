const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
router.get("/:mostView", (req, res) => {
  const { mostView } = req.params;
  const filePath = path.join(
    __dirname,
    `../../database/mostView/${mostView}.json`
  );

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const mostViewData = JSON.parse(data); // Thay đổi tên biến để tránh trùng lặp
    res.json(mostViewData); // Sử dụng tên biến mới
  });
});

module.exports = router;

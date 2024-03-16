const express = require("express");
const crawlAndSaveData = require("./crawler");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");

const app = express();
require("dotenv").config();
const cron = require("node-cron");
cron.schedule("*/30 * * * *", () => {
  crawlAndSaveData();
});
const swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "MTienDev",
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

// Mô tả endpoint /youtubeAll
/**
 * @swagger
 * tags:
 *   name: Youtube
 * /youtubeAll:
 *   get:
 *     summary: Get all top trending YouTube videos.
 *     tags: [Youtube]
 *     responses:
 *       200:
 *         description: A list of top trending YouTube videos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rank:
 *                     type: string
 *                   change:
 *                     type: string
 *                   title:
 *                     type: string
 *                   views:
 *                     type: string
 *                   likes:
 *                     type: string
 */
app.get("/youtubeAll", (req, res) => {
  fs.readFile("top_videos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const topVideos = JSON.parse(data);
    res.json(topVideos);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

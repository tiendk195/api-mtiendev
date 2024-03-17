const express = require("express");
const crawlAndSaveData = require("./crawler");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const specs = require("./controllers/swagger");

const app = express();
require("dotenv").config();
const cron = require("node-cron");
const PORT = process.env.PORT || 3000;

cron.schedule("*/30 * * * *", crawlAndSaveData);

const swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "MTienDev",
};

app.use("/", (req, res, next) => {
  if (req.originalUrl === "/") {
    return res.redirect("/api-docs");
  }
  next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

const youtubeAllController = require("./controllers/youtube/ytbAll");
const youtubeAsianController = require("./controllers/youtube/ytbAsian");
const tredingWorldwideController = require("./controllers/youtube/treding_worldwide");
const artistVideosController = require("./controllers/youtube/artistVideos.js");
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
 *         description: Most viewed videos in the past 24 hours.
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
 *                   url:
 *                      type: string
 *                   views:
 *                     type: string
 *                   likes:
 *                     type: string
 */
app.use("/youtubeAll", youtubeAllController);

/**
 * @swagger
 * tags:
 *   name: Youtube
 * /youtubeAsian:
 *   get:
 *     summary: Get all top trending YouTube videos in Asian region.
 *     tags: [Youtube]
 *     responses:
 *       200:
 *         description: Most viewed videos in the Asian region.
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
 *                   url:
 *                      type: string
 *                   views:
 *                     type: string
 *                   likes:
 *                     type: string
 */
app.use("/youtubeAsian", youtubeAsianController);

/**
 * @swagger
 * tags:
 *   name: Youtube
 * /treding:
 *   get:
 *     summary: Music videos trending worldwide.
 *     tags: [Youtube]
 *     responses:
 *       200:
 *         description: Music videos trending worldwide.
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
 *                   url:
 *                      type: string
 *                   tags:
 *                     type: string
 *                   highlights:
 *                     type: string
 */
app.use("/treding", tredingWorldwideController);

/**
 * @swagger
 * tags:
 *   name: Youtube
 * /artistVideos/{artist}:
 *   get:
 *     summary: Get top trending YouTube videos of a specific artist.
 *     tags: [Youtube]
 *     parameters:
 *       - in: path
 *         name: artist
 *         required: true
 *         description: The name of the artist.etc :sontungm-tp (note*:letter incase of english none space)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Top trending videos of the specified artist.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   url:
 *                     type: string
 *                   views:
 *                     type: string
 *                   yesterday:
 *                     type: string
 *                   publish:
 *                     type: string
 */
app.use("/artistVideos", artistVideosController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

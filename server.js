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
const artistVideosController = require("./controllers/youtube/artistVideos");
const countriesController = require("./controllers/youtube/countries");

/**
 * @swagger
 * tags:
 *   name: Youtube
 * /youtubeAll:
 *   get:
 *     summary: Most viewed videos in the past 24 hours
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
 *     summary: Most viewed videos in the past 24 hours
 *     tags: [Youtube]
 *     responses:
 *       200:
 *         description: Most viewed videos Asian in the past 24hours.
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
 *         description: >
 *           The name of the artist. Example: sontungm-tp (note*: letter lowcase of english and none space)
 *         schema:
 *           type: string
 *           enum:
 *             - sontungm-tp
 *             - bts
 *             - justinbieber
 *             - edsheeran
 *             - taylorswift
 *             - shakira
 *             - blackpink
 *             - katyperry
 *             - eminem
 *             - arianagrande
 *             - theweeknd
 *             - maroon5
 *             - rihanna
 *             - brunomars
 *             - twice
 *             - adele
 *             - alanwalker
 *             - exo
 *             - sia
 *             - psy
 *             - billieeilish
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

/**
 * @swagger
 * tags:
 *   name: Youtube
 * /countryVideos/{country}:
 *   get:
 *     summary: Get top trending YouTube videos of a specific country.
 *     tags: [Youtube]
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         description: The name of the country.etc :vn,kr,us,uk (note*:letter lowcase of english and none space)
 *         schema:
 *           type: string
 *         enum:
 *             - us
 *             - uk
 *             - fr
 *             - de
 *             - kr
 *             - vn
 *             - jp
 *             - hk
 *             - tw
 *             - th
 *     responses:
 *       200:
 *         description: Top trending videos of the specified country.
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
 *                   weeks:
 *                     type: string
 *                   peak:
 *                     type: string
 *                   peakChange:
 *                     type: string
 *                   streams:
 *                     type: string
 *                   streamsChange:
 *                     type: string
 */
app.use("/countryVideos", countriesController);
const mostViewsController = require("./controllers/youtube/mostViewVideos");

/**
 * @swagger
 * tags:
 *   name: MostView
 * /mostViewVideos/{mostView}:
 *   get:
 *     summary: Get most viewed videos by category.
 *     tags: [MostView]
 *     parameters:
 *       - in: path
 *         name: mostView
 *         required: true
 *         description: |
 *           The category of most viewed videos. Enter comma-separated values from the following categories:
 *           - thai
 *           - vietnamese
 *           - japanese
 *           - korean
 *           - male_group
 *           - female_group
 *           - male
 *           - female
 *           - published_2023
 *           - published_2022
 *           - published_2021
 *           - published_2020
 *           You can combine multiple categories by separating them with commas (e.g., "vietnamese,korean" for Vietnamese and Korean videos).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Most viewed videos by category.
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
 */
app.use("/mostViewVideos", mostViewsController);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

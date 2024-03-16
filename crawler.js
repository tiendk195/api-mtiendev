const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const crawlAndSaveData = () => {
  const url = "https://kworb.net/youtube/";

  axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const topVideos = [];

      $("table#youtuberealtime tbody tr").each((index, element) => {
        const video = {
          rank: $(element).find("td:nth-child(1)").text().trim(),
          change: $(element).find("td:nth-child(2)").text().trim(),
          title: $(element).find("td:nth-child(3) div a").text().trim(),
          views: $(element).find("td:nth-child(4)").text().trim(),
          likes: $(element).find("td:nth-child(5)").text().trim(),
        };
        topVideos.push(video);
      });
      const jsonData = JSON.stringify(topVideos, null, 2);
      fs.writeFileSync("top_videos.json", "");
      fs.writeFile("top_videos.json", jsonData, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("Data has been written to top_videos.json");
      });
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
};

module.exports = crawlAndSaveData;
crawlAndSaveData();

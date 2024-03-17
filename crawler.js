const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const crawlAndSaveData = () => {
  const url1 = "https://kworb.net/youtube/";
  axios
    .get(url1)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const topVideos = [];

      $("table#youtuberealtime tbody tr").each((index, element) => {
        const titleElement = $(element).find("td:nth-child(3) div a");
        const video = {
          rank: $(element).find("td:nth-child(1)").text().trim(),
          change: $(element).find("td:nth-child(2)").text().trim(),
          title: titleElement.text().trim(),
          url: "https://kworb.net/youtube/" + titleElement.attr("href"),
          views: $(element).find("td:nth-child(4)").text().trim(),
          likes: $(element).find("td:nth-child(5)").text().trim(),
        };
        topVideos.push(video);
      });

      const jsonData = JSON.stringify(topVideos, null, 2);
      fs.writeFileSync("./database/top_videos.json", "");
      fs.writeFile("./database/top_videos.json", jsonData, (err) => {
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

  const url2 = "https://kworb.net/youtube/realtime_asian.html";
  axios
    .get(url2)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const topAsianVideos = [];

      $("table#youtuberealtime tbody tr").each((index, element) => {
        const titleElement = $(element).find("td:nth-child(3) div a");
        const video = {
          rank: $(element).find("td:nth-child(1)").text().trim(),
          change: $(element).find("td:nth-child(2)").text().trim(),
          title: titleElement.text().trim(),
          url: "https://kworb.net/youtube/" + titleElement.attr("href"),
          views: $(element).find("td:nth-child(4)").text().trim(),
          likes: $(element).find("td:nth-child(5)").text().trim(),
        };
        topAsianVideos.push(video);
      });

      const jsonData = JSON.stringify(topAsianVideos, null, 2);
      fs.writeFileSync("./database/ytb_asia.json", "");
      fs.writeFile("./database/ytb_asia.json", jsonData, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("Data has been written to ytb_asia.json");
      });
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });

  const url3 = "https://kworb.net/youtube/trending.html";
  axios
    .get(url3)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const tredingWorldwide = [];

      $("table#trendingoverall tbody tr").each((index, element) => {
        const titleElement = $(element).find("td:nth-child(3) div a");
        const video = {
          rank: $(element).find("td:nth-child(1)").text().trim(),
          change: $(element).find("td:nth-child(2)").text().trim(),
          title: titleElement.text().trim(),
          url: "https://kworb.net" + titleElement.attr("href"),
          tags: $(element).find("td:nth-child(4)").text().trim(),
          highlights: $(element).find("td:nth-child(5)").text().trim(),
        };
        tredingWorldwide.push(video);
      });

      const jsonData = JSON.stringify(tredingWorldwide, null, 2);
      fs.writeFileSync("./database/treding_worldwide.json", "");
      fs.writeFile("./database/treding_worldwide.json", jsonData, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("Data has been written to treding_worldwide.json");
      });
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
};

module.exports = crawlAndSaveData;
crawlAndSaveData();

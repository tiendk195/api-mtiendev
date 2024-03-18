**Project Name: YouTube Insights API**

**Description:**
The YouTube Insights API provides access to trending videos data from various countries and artists. It crawls data from the Kworb website and presents it in a structured JSON format, allowing developers to integrate YouTube trending data into their applications.

**Usage:**

1. Clone the repository:
   ```bash
   git clone https://github.com/tiendk195/api-mtiendev.git
   ```
2. Navigate to the project directory:
   ```bash
   cd api-mtiendev
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Access the API endpoints:
   - `/youtubeAll`: Get all top trending YouTube videos globally.
   - `/youtubeAsian`: Get all top trending YouTube videos in Asian region.
   - `/treding`: Get music videos trending worldwide.
   - `/artistVideos/{artist}`: Get top trending YouTube videos of a specific artist.
   - `/mostViewVideos/{mostView}`: Get most viewed videos by category

**Deployment on Render:**
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/tiendk195/api-mtiendev).Or try accessing the API at: [https://api-mtiendev.onrender.com/](https://api-mtiendev.onrender.com/)

**Contributing:**
Contributions are welcome! If you have any suggestions, feature requests, or bug reports, please open an issue or create a pull request on GitHub.

**License:**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

**Contact:**
For any inquiries or support, please contact [tiendk195@gmail.com](mailto:tiendk195@gmail.com).

**Acknowledgements:**

- This project utilizes the Axios, Cheerio, Express, and Swagger UI Express libraries.
- Special thanks to Kworb for providing the YouTube trending data used in this API.

**Happy coding!**

**Note:**

1. Due to the resource-intensive nature of cron data, please consider this when deploying to a server.

2. Ensure that your Render web service is configured to build from the correct branch and has the appropriate build settings for Node.js applications.

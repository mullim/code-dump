const http = require("http");
const path = require("path");
const fs = require("fs");
const server = http.createServer();

// Constants
const PORT = 8080;
const UPLOAD_PATH = path.join(__dirname, "../uploads");

// Start HTTP Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Listen for HTTP requests
server.on("request", (req, res) => {
  // Serve the static index file
  if (req.url === "/" && req.method === "GET") {
    return res.end(
      fs.readFileSync(path.join(__dirname, "../static/index.html"))
    );
  }

  if (req.url.includes("/upload?") && req.method === "POST") {
    // Get the file name from the request
    const query = new URLSearchParams(req.url);
    const fileName = query.get("/upload?fileName");

    // Set the path for the file to be uploaded to
    const filePath = path.join(UPLOAD_PATH, fileName);

    // Listener on chunks
    req.on("data", (chunk) => {
      // appedFileSync will append to a file, creating it if it doesn't exist
      fs.appendFileSync(filePath, chunk);
    });

    return res.end("File uploaded succesfully");
  }
});

import { createServer } from 'node:http';
import { URL } from "node:url";
import fs from "node:fs";

const favicon_ico = fs.readFileSync("favicon.ico");
const html = fs.readFileSync("index.html");
// Create a HTTP server
const server = createServer((req, res) => {
  const request_url = new URL(`http://${host}${req.url}`);
  const path = request_url.pathname;

  if (req.method !== "GET") {
    res.writeHead(405, { "content-type": "text-plain" });
    res.end("Method not allowed\n");
  }
  if (!res.writableEnded && path === '/') {
    res.writeHead(200, { "content-type": "text/html" })
    res.end(html);
  }
  if (!res.writableEnded && path === '/favicon.ico') {
    res.writeHead(200, { "content-type": "image/x-icon" })
    res.end(favicon_ico);
  }

  if (!res.writableEnded) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Site not found!\n");
  }
});

const port = 8000;
const host = "localhost";

// Start the server
server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
}); 
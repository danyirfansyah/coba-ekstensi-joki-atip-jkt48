// Static server for jkt48-test-site with route rewrites that mirror
// the real jkt48.com URL structure (needed so the JKT48 Auto War extension's
// content script, which matches exact paths, behaves the same here as in prod).
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 5500;

const ROUTES = {
  "/what-are-exclusive": "what-are-exclusive.html",
  "/what-are-exclusive/all": "all.html",
  "/purchase/exclusive": "purchase.html",
  "/purchase/success": "success.html",
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
};

http
  .createServer((req, res) => {
    const urlPath = req.url.split("?")[0];
    const relPath = ROUTES[urlPath] || (urlPath === "/" ? "index.html" : urlPath.slice(1));
    const filePath = path.join(ROOT, relPath);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found: " + urlPath);
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(`Serving jkt48-test-site at http://localhost:${PORT}`);
  });

const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/menu") {
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        items: ["thali", "biryani", "laddus"],
      })
    );
  } else if (req.method === "POST" && req.url === "/order") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const order = JSON.parse(data);

      res.writeHead(201, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          success: true,
          order,
        })
      );
    });
  } else {
    res.writeHead(404);
    res.end("Route not found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
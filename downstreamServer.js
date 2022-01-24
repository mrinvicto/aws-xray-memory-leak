const http = require("http");

const requestListener = function (req, res) {
  setTimeout(() => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on("end", () => {
      console.log(body);
      res.end("ok");
    });
  }, 3500);
};

const server = http.createServer(requestListener);
server.listen(8080);

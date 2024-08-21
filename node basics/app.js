const http = require("http");
const val = require("./data");

const server = http.createServer((req, res) => {
  //   console.log("Req is: ", req.headers);
  //   return "h1";
  console.log("Data imported from other file is: ", val.data);
  val.fun();
  process.exit();
});

server.listen(3000);

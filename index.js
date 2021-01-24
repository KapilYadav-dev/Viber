const express = require("express");
const app = express();
const download = require("./Routes/download");
const port = process.env.PORT || 8080;

app.get("/download", (req, res) => {
  download.doWork(req, res);
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

if (process.env.NODE_ENV == "production") {
  app.use(express.static("clients/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clients", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;
app.listen(port, console.log(`server started on port ${port}`));

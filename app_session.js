import express from "express";
import session from "express-session";

const app = express();

app.get("/", (req, res) => {
  res.setHeader("Content-disposition", "attachment; filename=app.js");
  res.download(import.meta.dirname + "/app.js");
});

app.listen(80);

import express from "express";
import session from "express-session";
import morgan from "morgan";
import os from "node:os";

const app = express();
app.use(morgan("dev"));

const sessions = {
  session1: session({
    secret: "V5ALphnKHsJyJgxIsxtvzeNIjI09w97O",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 },
  }),
  session2: session({
    secret: "MzlzGIHOq3OgEmmP9geqZrEd1l75z42T",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 1000,
    },
  }),
  session3: session({
    secret: "bfuyvrc4ghewf",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 1000,
    },
  }),
};

app.use("/", sessions["session3"]);
app.get("/", (req, res) => {
  req.session.main = "serverUp";
  res
    .send(
      "https://github.com/users/hwestx/emails/326287629/confirm_verification/2f7489fc7ac9df8a6680e821b9c5b7dccb2e4f49",
    )
    .status(200);
});
app.use("/s1Create", sessions["session1"]);
app.get("/s1Create", (req, res) => {
  req.session.xData = "3.14";
  res.send("s1c").status(200);
});
app.get("/s1Create/:px", (req, res) => {
  if (req.params.px === "display") {
    res.send(req.session.xData).status(200);
  }
});

app.use("/s2Create", sessions["session2"]);
app.get("/s2Create", (req, res) => {
  req.session.yData = os.hostname();
  res.send("session value defined").status(200);
});
app.get("/s2Create/:px", (req, res) => {
  if (req.params.px === "display") {
    res.send(req.session.yData).status(200);
  }
});

app.get("/sessions", (req, res) => {
  res.send(`${req.session.xData} ${req.session.yData} ${req.session.main}`);
});

app.listen(3000);

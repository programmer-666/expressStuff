import express from "express";
import session from "express-session";

const app = express();

const session1 = session({
	secret: "a123x",
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false, maxAge: 60000}
});

app.use(session1);
app.get("/", (req, res) => {
	req.session.xData = "3.14";
	res.send("welcome").status(200);
});
app.get("/session", (req, res) => {
	res.send(req.session.xData).status(200);
});

app.listen(3000);

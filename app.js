require("dotenv").config();
var express = require("express");
var app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// use res.render to load up an ejs view file
app.use(express.static("public"));
// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.get("/register", (req, res) => {
  res.render("pages/register");
});

app.get("/userHome", (req, res) => {
  res.render("pages/userHome");
});

app.get("/createJob", (req, res) => {
  res.render("pages/createJob");
});
app.get("/error", (req, res) => {
  res.render("pages/error");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

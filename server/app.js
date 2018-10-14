const express = require("express");

let app = express();
const port = process.env.PORT || 3000;

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const helmet = require("helmet");
app.use(helmet());

const cors = require("cors");
app.use(cors());

const compression = require("compression");
app.use(compression());

app.use(morgan("dev")); // log requests in console
app.use(cookieParser()); // read cookies

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());
var path = require("path");

app.use("/scripts", express.static(path.join(__dirname, "/node_modules")));
// app.use('/scripts', express.static(__dirname + '/node_modules'));

const PATHS = {
  JS: path.join(__dirname, '..', 'dist', 'js'),
  CSS: path.join(__dirname, '..', 'dist', 'css'),
}

// console.log(newPath);
app.use("/js", express.static(path.join(PATHS.JS)));
app.use("/css", express.static(path.join(PATHS.CSS)));
app.use("/", express.static(path.join(__dirname, '..', 'dist')));

// Allows the .html suffix and renders by using ejs.
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/");
app.set("view engine", "ejs"); // set up templates
const LinksController = require("./api/links");
const SettingsController = require("./api/settings");

app.use("/api/links", LinksController);
app.use("/api/settings", SettingsController);


if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.get("/", (req, res, next) => {
    res.render("../dist/index.html");
  })
}

app.listen(port);

console.info(`Running in ${process.env.NODE_ENV} mode`);
console.log(`Server started on ${port}`);
/*
 * A simple express.js server. Use
 * `$node server' to run it or
 * `$nodemon server' to run it without the need to
 * refresh after every change to the code.
 */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); /* core module, no install necessary */

const port = 8080;
const app = express();

/*
 * Custom middleware should be registered before ALL
 * routes it's supposed to work for. Firefox asks for
 * a favicon so a dummy is required to prevent logging
 * twice per page reload/get request for a route.
 */
const logger = (res, req, next) => {
    console.log(`${req.req.method} for route '${req.req.url}'`);
    next();
};
app.use(logger);

/* use body parser middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
 * Set up a static file server. Static assets override
 * any routes later in the application, so index.html
 * gets served from static/ even if a '/' route is
 * defined.
 */
app.use(express.static(path.join(__dirname, "static")));

/* handle requests to '/' */
app.get("/", (req, res) => {
    res.send(page);
});

/* handle requests to '/data' */
const data = {
    name: "John Doe",
    age: "43",
    hobbies: ["football", "golf", "tennis"],
    friends: ["Jim", "Tom", "Paul"],
};

app.get("/data", (req, res) => {
    res.json(data); /* send data as json */
});

/* listen and server */
app.listen(port, () => {
    console.log(`Up since ${(new Date()).toUTCString()}, ` +
                `listening on localhost:${port}.\nEvent log:`);
});

/* a basic html page */
const page = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- send a mock favicon, otherwise firefox will ask for one
         and a second get request gets logged without an actual
         browser refresh. -->
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <title>Express.js App</title>
</head>
<body>
    <h1>Hello Express</h1>
    <p>My first express view. Nice!</p>
</body>
</html>`;

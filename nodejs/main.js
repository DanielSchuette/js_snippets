/*
 * With only one export, use:
 * `const varName = require("moduleName");'
 * Otherwise, named object deconstruction
 * is necessary to associate names and variables
 * (see below). This is CommonJs Syntax,
 * because ES6 import syntax:
 * `import Person from "./person";'
 * is not yet support by node (02/2019).
 */
const { person, Person } = require("./person");
const Logger = require("./logger");

// console.log(person);
p1 = new Person("Dave", "Smith", 39, "dsmith@yahoo.com");
p1.print();

// instantiate a logger and call it
const logger = new Logger();
logger.on("message", (data) => console.log("Logger: ", data));
logger.log("Hello logger.");
logger.log("Another message for you.");

/*
 * A basic web server
 */
const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile(
            path.join(__dirname, "static", "index.html"),
            (err, data) => {
                if (err)
                    throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
        });
    }

    if (req.url === "/about") {
        fs.readFile(
            path.join(__dirname, "static", "about.html"),
            (err, data) => {
                if (err)
                    throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
        });
    }

    if (req.url === "/api/users") {
        // usually, you want to fetch data from db/calculate values
        const users = [
            { name: "Bob Smith", age: 42 },
            { name: "John Doe", age: 56 },
        ];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    }

    // alternatively, build file path dynamically
    const filePath = path.join(
        __dirname, "static",
        req.url === "/" ? "index.html" : req.url
    );

    // then, create the correct content-type
    const extname = path.extname(filePath);
    let contentType = "text/html";

    switch (extname) {
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
    }

    // read file from created path
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                // Page not found
                fs.readFile(
                    path.join(__dirname, "static", "404.html"),
                    (err, data) => {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end(data, "utf8");
                });
            } else {
            // some server error
            res.writeHead(500);
            res.end(`Server error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data, "utf8");
        }
    });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

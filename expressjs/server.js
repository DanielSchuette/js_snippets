/*
 * A simple express.js server. Use
 * `$node server' to run it or
 * `$nodemon server' to run it without the need to
 * refresh after every change to the code.
 */
const express = require("express");
const { check, body, validationResult } = require('express-validator/check');
const bodyParser = require("body-parser");
const mongojs = require("mongojs");
const ObjectId = mongojs.ObjectId;
const path = require("path"); /* core module, no install necessary */

const port = 8080;
const app = express();

/* set up database connection */
const db = mongojs("customerapp", ["users"]);

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
 * Include ejs as an html templating engine and
 * set a view directory to store templates in.
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));

/*
 * Set up a static file server. Static assets override
 * any routes later in the application, so index.html
 * gets served from static/ even if a '/' route is
 * defined. Also, static files for ejs templates need
 * to be served, too!
 */
app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "templates/static")));

/* set local variables using middleware */
app.use((res, req, next) => {
    /*
     * res.locals.variableName = "whatever value";
     * Somehow doesn't work. Read documentation if
     * needed.
     */
    next();
});

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

/*
 * Handle server-side rendering of ejs templates.
 * Users should probably be a local variable
 * (see above).
 */
const users = {
    title: "This is a second, dynamic title",
    msg: "",
    users: [
        {
            id: 0,
            firstName: "John",
            lastName: "Doe",
            age: 41,
        },
        {
            id: 1,
            firstName: "Bob",
            lastName: "Smith",
            age: 62,
        },
        {
            id: 2,
            firstName: "Jill",
            lastName: "Jackson",
            age: 56,
        },
    ],
};

app.get("/users", (req, res) => {
    db.users.find((err, docs) => {
        console.log(docs);
        users.users = docs;
        res.render("index.ejs", users);
    });
});

app.get("/data", (req, res) => {
    res.json(data); /* send data as json */
});

/* catch a post request to /users/add */
app.post("/users/add", (req, res) => {
    /*
     * Sanitize inputs using express-validator. This
     * does not do anything, of course. Read the
     * documentation to make this actually useful.
     */
    console.log(body(req.body));

    /* create a new user from form data and append to `users' */
    const newUser = {
        id: users.users.length,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        age: 0, /* unknown! :) */
    };
    users.users.push(newUser);
    users.msg = "Successful submission!";

    /* insert into database, too */
    db.users.insert({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: 0,
    }, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/users");
    });

    /*
     * Signal successful submission.
     * This does NOT work with an active redirect
     * (line 145), because one cannot set headers
     * twice. This is just for the purpose of
     * demonstrating an in-memory as well as
     * persistent database in one file (not a good
     * idea for production, though!).
     */
    /*
    res.render("index.ejs", users);
    users.msg = ""; // reset message
    */
});

/* register delete route */
app.delete("/users/delete/:id", (req, res) => {
    db.users.remove({_id: ObjectId(req.params.id)}, (err, result) => {
        if (err) {
            /* one should probably do more error checking here ! */
            console.log(err);
        }
    });
    /*
     * Currently, this does not work because it DELETES to
     * that route instead of going there.
     */
    res.redirect("/");
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

const http = require("http");

/* create a server object */
http
    .createServer((req, res) => {
        /* write response */
        res.write("Hello Node!");
        res.end();
    })
    .listen(5000, () => console.log("Listening on port 5000."));

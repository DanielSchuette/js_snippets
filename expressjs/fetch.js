/*
 * A simple example of fetching data from
 * a REST API endpoint. Node does not
 * implement the fetch API, so `node-fetch'
 * or a similar npm module must be installed.
 */
const fetch = require("node-fetch");

/* fetch json data from '/data' route */
fetch("http://localhost:8080/data")
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));

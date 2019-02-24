/*
 * Most functions in the fs module are async.
 * Synchronous versions exists, though. They
 * follow this naming convention: fs.mkdirSync().
 */
const fs = require("fs");
const path = require("path");

/* create a folder asynchronously */
fs.mkdir(path.join(__dirname, "test"), {}, err => {
    /* don't throw error here, just log it */
    if (err) console.log(err);
    console.log("created folder test");
});

/* create and write to a file */
fs.writeFile(
    path.join(__dirname, "test", "test.txt"),
    "Hello Node!",
    err => {
        if (err) throw err;
        console.log("wrote to file test.txt");
        /*
         * Append to the file. This is async and
         * should be done within the callback of
         * the first async function.
         */
        fs.appendFile(
            path.join(__dirname, "test", "test.txt"),
            "This was appended to test.txt",
            err => {
                if (err) throw err;
                console.log("appended to file test.txt");

                /* async read from file */
                fs.readFile(
                    path.join(__dirname, "test", "test.txt"),
                    "utf8",
                    (err, data) => {
                        if (err) throw err;
                        console.log(data);
                });
        });
});

/*
 * Rename file with: fs.rename(...).
 */

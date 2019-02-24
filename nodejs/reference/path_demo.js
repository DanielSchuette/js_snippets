const path = require("path");

/* base file name and directory name */
console.log(__dirname, __filename);
console.log(path.basename(__dirname));
console.log(path.dirname(__dirname));

/* file extension */
console.log(path.extname(__filename));

/* create path object */
console.log(path.parse(__filename));

/* concatenate paths */
console.log(path.join(__dirname, "test", "index.html"));

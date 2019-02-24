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

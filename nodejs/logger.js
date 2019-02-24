const EventEmitter = require("events");
const uuid = require("uuid");

// logger class
class Logger extends EventEmitter {
    log(msg) {
        // raise event
        this.emit("message", { id: uuid.v4(), msg });
    }
}

module.exports = Logger;

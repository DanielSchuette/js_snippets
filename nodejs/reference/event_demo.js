const EventEmitter = require("events");

/* create class */
class MyEmitter extends EventEmitter {  }

/* initialize new emitter */
const myEmitter = new MyEmitter();

/* create event listener */
myEmitter.on("event", () => console.log("Event Fired!"));

/* init event */
myEmitter.emit("event");

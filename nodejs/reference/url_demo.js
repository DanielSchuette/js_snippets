const url = require("url");

const myUrl = new URL("https://mywebsite.com/hello.html?id=100&status=active");

/* serialized URL, host, etc. */
console.log(myUrl.href);
console.log(myUrl.toString());
console.log(myUrl.host);
console.log(myUrl.hostname); /* does not include the port */
console.log(myUrl.pathname);
console.log(myUrl.search);

console.log(myUrl.searchParams); /* actual object */
myUrl.searchParams.append("abc", "123");
console.log(myUrl.searchParams);

myUrl.searchParams.forEach((value, name) => {
    console.log(`${value}: ${name}`);
});

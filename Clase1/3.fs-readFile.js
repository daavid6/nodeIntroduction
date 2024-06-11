const fs = require("node:fs");

console.log("Leyendo archivo uno...");
fs.readFile("./archivo.txt", "utf8", (err, text) => {
  console.log(text);
});

console.log("Hago cosas de mientras (ASINCRONÍA)");

console.log("Leyendo archivo dos...");
fs.readFile("./archivo2.txt", "utf8", (err, text) => {
  console.log(text);
});
    
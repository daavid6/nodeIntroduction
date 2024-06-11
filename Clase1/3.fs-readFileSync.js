const fs = require("node:fs");

console.log("Leyendo archivo uno...");
const text1 = fs.readFileSync("./2.archivo.txt", "utf-8");
console.log(text1);

console.log("Leyendo archivo dos...");
const text2 = fs.readFileSync("./2.archivo2.txt", "utf-8");
console.log(text1);
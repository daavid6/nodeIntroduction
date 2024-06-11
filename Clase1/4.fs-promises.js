// En módulos nativos que no tengan promesas nativas podemos:
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

const fs = require('node:fs/promises')

console.log('Leyendo archivo uno...')
fs.readFile('./archivo.txt', 'utf8',)
  .then(text => {
    console.log('Primer texto:', text)
  })


console.log("Hago cosas de miientras (ASINCRONÍA)");


console.log("Leyendo archivo dos...");
fs.readFile("./archivo2.txt", "utf8").then((text) => {
  console.log("Segundo texto:", text);
});
    
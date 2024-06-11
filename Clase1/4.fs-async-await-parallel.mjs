// En módulos nativos que no tengan promesas nativas podemos:
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

import { readFile } from 'node:fs/promises'

Promise.all([
  readFile("./archivo.txt", "utf8"),
  readFile("./archivo2.txt", "utf8")
]).then(([text,secondText]) => {
    console.log(text);
    console.log(secondText);
});
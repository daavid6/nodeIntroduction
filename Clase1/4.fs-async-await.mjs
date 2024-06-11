// En módulos nativos que no tengan promesas nativas podemos:
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

import { readFile } from 'node:fs/promises'

console.log('Leyendo archivo uno...')
const text1 = await readFile('./archivo.txt', 'utf8',)
    console.log('Primer texto:', text1)

console.log("Hago cosas de miientras (ASINCRONÍA)")

console.log("Leyendo archivo dos...");
const text2 = await readFile("./archivo2.txt", "utf8")
    console.log("Segundo texto:", text2);

    
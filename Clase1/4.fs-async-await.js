// En módulos nativos que no tengan promesas nativas podemos:
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

const fs = require('node:fs/promises');

(
 async () => {
    console.log('Leyendo archivo uno...');
    const text1 = await fs.readFile('./archivo.txt', 'utf8',);
    console.log('Primer texto:', text1);

    console.log("Hago cosas de miientras (ASINCRONÍA)");

    console.log("Leyendo archivo dos...");
    const text2 = await fs.readFile("./archivo2.txt", "utf8");
    console.log("Segundo texto:", text2);
 }
)()



    
const { log } = require('node:console');
const path = require('node:path');

console.log(path.sep);

const filePath = path.join('est','es','mi','ruta');
console.log(filePath);

const base = path.basename('/tmp/fsdf/dsds/dsfsfs/archivito.txt')
console.log(base);

const fileName = path.basename("/tmp/fsdf/dsds/dsfsfs/archivito.txt", '.txt');
console.log(fileName);

const extension = path.extname('this.is.a.practise.jpg')
console.log(extension);
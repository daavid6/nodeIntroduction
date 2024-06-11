const os = require('node:os')

console.log('Informacion del sistema operativo')
console.log('--------------------------------')

console.log('Nombre del sitema operativo', os.platform())
console.log('Version del sitema operativo', os.release())
console.log('Arquitectura',os.arch())
console.log('Numero de cpus', os.cpus().length)
console.log('UpTime', os.uptime()/60/60)
console.log('Memoria libre', os.freemem()/1024/1024)


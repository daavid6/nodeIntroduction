
//argumentos de entrada
console.log(process.argv);

//controlar retornos de proceso
process.exit(1);
process.exit(0);

//gestionar interrupciones
process.on('exit', () => {
    //limpiar recursos
})

//current working dir
console.log(process.cwd());


console.log(process.env.PEPITO);
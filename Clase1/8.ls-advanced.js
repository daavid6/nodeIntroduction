const fs = require('node:fs/promises');
const pc = require('picocolors');
const path = require('path');

const folder = process.argv[2] ?? '.'


async function ls(directory) {
    let files;

    try {
        files = await fs.readdir(directory);
    } catch {
        //Uso picocolors en el console error
        console.error(pc.red(`No se ha podido leer el directorio ${directory}`));
        process.exit(1);
    }

    const filesPromised = files.map(async file => {
        const filePath = path.join(directory, file);

        let stats;
        try {
            stats = await fs.stat(filePath)
        } catch {
            console.error(`No se ha podido leer el archivo ${file}`);
            process.exit(1);
        }

        const fileType = stats.isDirectory() ? 'd' : 'f';
        const fileSize = stats.size.toString();
        const lastModified = stats.mtime.toLocaleString()

        return `${pc.bgMagenta(fileType)} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(lastModified)}`;
    });

    const filesInfo = await Promise.all(filesPromised);
    
    filesInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder);


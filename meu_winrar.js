const fs = require('fs')
const archiver = require('archiver')
var unzip = require('unzip');

if(process.argv[2].toLocaleLowerCase() == 'descompactar'){

    var inputFileName = process.argv[4];
    var extractToDirectory = process.argv[3];
    console.log(extractToDirectory)

    fs.createReadStream(inputFileName)
        .pipe(unzip.Extract({
            path: extractToDirectory 
        }));

}
else if(process.argv[2].toLocaleLowerCase() == 'compactar'){

    var saida = fs.createWriteStream(  process.argv[4])
    var compactador = archiver('zip')

    saida.on('close', () => {
        console.log(compactador.pointer() + ' bytes totais')
    })

    compactador.pipe(saida)

    var arquivo = process.argv[3]
    compactador.append(fs.createReadStream(arquivo), {name: process.argv[3]})

    compactador.finalize()
}
else {
    console.log('Operação escrita incorretamente')
}
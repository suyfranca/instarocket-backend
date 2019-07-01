const multer = require ('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({ //salvar img dentro do projeto, no disco
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        //caminho relativo para salvar as imagens. dirname=retorna o diretorio que eu estou utilizando.
        //para voltar, eu preciso dar .. .. para cada pasta e acessar a que eu quero "upload"
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    })
}
const express = require('express');
//importar o express
const mongoose = require('mongoose');
//importar o mongoose
const path = require('path');
const cors = require('cors');



const app = express();
//cria um servidor

const server = require('http').Server(app);
//o server tem aceso ao protocolo http

const io = require('socket.io')(server);
//o server começa a aceitar conexões http e conexões via web socket.
//

mongoose.connect('mongodb+srv://semana:semana@cluster0-ica1q.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})
//conectar o banco à aplicação. a string copiada no site do mongobd é adicionada aqui.

app.use((req, res, next) => {
    req.io = io;

    next();
})

app.use(cors()); //permite que as chamadas em JS acessem recursos de outras origens

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
//ao acessar a pasta 'files', será acessado a pasta uploads

app.use(require('./routes'));
//aplicação vai conhecer as routas através do caminho que foi criado




server.listen(3333);
//abrir uma porta do navegador para acesso do back. exemplo 3333.
// ao invés de app, é substituido para server



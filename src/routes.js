const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);



routes.post('/posts', upload.single('image'), PostController.store);
//metodo(rota,metodo store dentro do controller)

routes.get('/posts', PostController.index);

routes.post('/posts/:id/like', LikeController.store);






//routes.get('/', (req, res) => { //middleware - recebe dois parametros req e res e recebe alguma coisa
    //middleware é um interceptador de chamadas entre clienteXservidor
    //para todo tipo de resposta para o cliente eu preciso usar o res
    //req é quando eu recebo alguma requisição (parâmetro) do cliente
    //return res.send(`Olá ${req.query.name}`);
//para poder utilizar variáveis dentro das strings, usar apostrofes
//} )
//criacao de rotas. metodos get(buscar info) post(cadastrar info) put(editar info) delete(deleter). 
// a barra é o navegador, raiz




module.exports = routes;
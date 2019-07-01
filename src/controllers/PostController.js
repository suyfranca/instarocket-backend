const Post = require('../models/Post');
//importar o model de post

const sharp = require ('sharp');
const path = require('path');
const fs = require('fs');


module.exports = {
    async index(req, res) {
        //retorna uma list dos posts que já estão cadastrados no banco
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res) {
        //criar o post
        //precisa ter acesso ao insomnia para ter acesso aos arquivos da aplicação
        const { author, place, description, hashtags } = req.body; //recebe os dados do post
        const { filename : image} = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        //redimensiona a imagem
        await sharp(req.file.path ) //caminho da imagem
            .resize(500)
            .jpeg({ quality: 70})
            .toFile( //salvar a imagem 
                path.resolve(req.file.destination, 'resized', fileName)  //
            )

            fs.unlinkSync(req.file.path); //deleta a imagem original e deixa apenas a modificada


        const post = await Post.create({ //salva no banco de dados
            author,
            place,
            description,
            hashtags,
            image: fileName,
        });

        req.io.emit('post', post); //emite uma info em real time        
        return res.json( post ); 

    }

    //códigos assincronos = criação de registros, ex, leva um tempo para criar, por isso assync
};
//exportar um objeto que contém os métodos do meu controller

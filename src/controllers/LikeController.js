const Post = require('../models/Post');
//importar o model de post

module.exports = {
    async store(req, res) {
        const post = await Post.findById(req.params.id);
        //pegar o post do banco

        post.likes += 1;
        //dá o like

        await post.save();
        //salva o like

        req.io.emit('like', post); //emite real time dentro dos posts

        //criar o post
        //precisa ter acesso ao insomnia para ter acesso aos arquivos da aplicação
        return res.json( post );


    }

    //códigos assincronos = criação de registros, ex, leva um tempo para criar, por isso assync
};
//exportar um objeto que contém os métodos do meu controller

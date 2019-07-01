const mongoose = require ('mongoose');
//importar o mongoose

const PostSchema = new mongoose.Schema({
    //informa quais colunas estão disponíveis na nossa tb no DB
    author: String,
    place: String,
    description: String, 
    hashtags: String,
    image: String,
    likes: {
        type:Number,
        default:0, //inicia com 0
    } //abstração da tabela
}, {
    timestamps: true, //cria um campo em cada registro, para fixar as datas de criação e atualização
});

module.exports = mongoose.model('Post', PostSchema);
const mongoose = require('mongoose');

const vereadorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: {type: String, required: true},
    cnpj: {type: String, required: true},
    gasto: {type: String, required: true},
    valor: {type: String, required: true},
    mes: {type: String, required: true},
});

module.exports = mongoose.model('Vereador',vereadorSchema)

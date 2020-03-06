const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const AlunoSchema = new Schema(
    {
        matricula: {type: String, required: true},
        nome: {type: String, required: true },
        dataNas: {type: Date, required: true },
        email: {type: String, required: true },
        ddd: {type: String, required: true },
        numero: {type: String, required: true },
        operadora: {type: String, required: true },
        campus: {type: String, required: true },
        curso: {type: String, required: true }
    }
);

module.exports = mongoose.model('Aluno', AlunoSchema);
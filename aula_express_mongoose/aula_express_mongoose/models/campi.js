const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const CampiSchema = new Schema(
    {
        codigo: {type: String, required: true},
        campi: {type: String, required: true },
        cursos: [{
            type: String
        }]
    }
);

module.exports = mongoose.model('Campi', CampiSchema);

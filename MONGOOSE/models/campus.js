const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const CampusSchema = new Schema(
    {
        codigo: {type: String, required: true},
        campus: {type: String, required: true },
        cursos: [{
            type: String
        }]

    }
);

module.exports = mongoose.model('Campus', CampusSchema);
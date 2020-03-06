const express = require('express');
const cors = require('cors');
const alunosRouter = require('../route/alunos.js');
const campusRouter = require('../route/campus.js');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = function() {
    var app = express();
    app.set("port", 3000);
    app.use(bodyParser.json());   
    app.use(cors());    
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(express.static('./public'));
    alunosRouter(app);
    campusRouter(app);
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname, '../public/index.html'));
    });
    return app;
 };


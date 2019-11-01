var campus = [];
const alunos = require("../controller/alunos.js");
//Mensagem json esperada para campi
//{
//	"codigo": "32",
//	"campi": "Pici",
//	"cursos": ["Computacao", "Matematica", "Fisica"]
//}

module.exports.listaCampi = function(req, res){
    res.json(campus);
}

module.exports.obterCampi = function(req, res){
    var codigo = req.params.codigo;
    var campi = campus.find(campi => (campi.codigo == codigo));
    if (campi){
        res.json(campi);
    } else{
        res.status(404).send("Campus não encontrado");
    }
}

module.exports.inserirCampi = function(req, res){
    var codigo = req.body.codigo;
    var _campi = campus.find(_campi => (_campi.codigo == codigo));
    if(_campi){
        res.status(500).send("Campi ja existe na base de dados");
    }
    else{
        if(req.body.cursos < 1){
            res.status(500).send("Necessario mais de um curso");
        }
        else{
            let campi = req.body;
            campus.push(campi);
            res.status(200).send(campi);
        }
    } 
}

module.exports.atualizarCampi = function(req, res){
    let codigo = req.params.codigo;
    let _campi = campus.find(_campi => (_campi.codigo == codigo));
    if (_campi){
        if(req.body.cursos < 1){
            res.status(500).send("Necessario mais de um curso");
        }
        else{
            _campi.campi = req.body.campi;
            _campi.cursos = req.body.cursos;
            res.json(_campi);
        }
        
    } else{
        res.status(404).send("Aluno não encontrado");
    }
}

module.exports.removerCampi = function(req, res){
    let codigo = req.params.codigo;
    let _campi = campus.find(_campi => (_campi.codigo == codigo));
    if (_campi){
        const index = campus.indexOf(_campi)
        campus.splice(index,1);
        alunos.removerAlunoCampi(_campi.campi);
        res.json(_campi);
    } else{
        res.status(404).send("Campus não encontrado");
    }
}

module.exports.returnCampus = function(){
    return campus;
}



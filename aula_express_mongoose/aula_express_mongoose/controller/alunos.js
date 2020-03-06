const Aluno = require("../models/aluno")
const Campi = require("../models/campi")

module.exports.listaAlunos = function(req, res){
    Aluno.find({})
    .then(alunos => {
        res.json(alunos);
    })
    .catch(err => console.log(err));
}

module.exports.obterAluno = function(req, res){
    var id = req.params.matricula;    
    Aluno.findById(id)
    .then(aluno => {
        res.status(200).send(aluno)
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Aluno não encontrado");
    });
}

module.exports.inserirAluno = function(req, res){
    const aluno = new Aluno(req.body);
    var _campusAux = Campi.findById(req.body.campus);
    if(_campusAux){
        var _alunoAux = Aluno.findById(req.body.matricula);
        if(_alunoAux){
            res.status(500).send("Aluno ja existe no banco de dados");
        }
        else{
            aluno
            .save()
            .then(res.status(200).send(aluno))
            .catch((err => {
                console.log(err);
            })); 
        }

    }
    else{
        res.status(404).send("Campus não existe");
    }
  
}


module.exports.atualizarAluno = function(req, res){
    Aluno.findByIdAndUpdate(req.params.id, {$set:{nome:req.body.nome, dataNas:req.body.dataNas,
                         email:req.body.email, ddd:req.body.ddd, numero:req.body.numero,
                        operadora: req.body.operadora, campus:req.body.campus, curso:req.body.curso }},{new:true})
    .then(old_aluno => {
            res.send(old_aluno)        
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Aluno não encontrado");
    });
    
    
}

module.exports.removerAluno = function(req, res){
    Aluno.findByIdAndRemove({_id:req.params.id})
    .then(old_aluno => {
            res.send(old_aluno)
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Aluno não encontrado");
    });
}



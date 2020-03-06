const Aluno = require("../models/aluno")
const Campus = require("../models/campus")

module.exports.listaAlunos = function(req, res){
    if(req.query.campus){
        Aluno.find({campus: req.query.campus}).lean().exec(function (err, users) {
            res.send(JSON.stringify(users));
            
        })
    }
    else if(req.query.curso){
        Aluno.find({curso: req.query.curso}).lean().exec(function (err, users) {
            res.send(JSON.stringify(users));
        })
    }
    
    else{
        Aluno.find({})
        .then(alunos => {
            res.status(200).json(alunos);
        })
        .catch(err => console.log(err));
    }

    

}

module.exports.obterAluno = function(req, res){   
    Aluno.find({matricula: req.params.matricula})
    .then(aluno => {
        res.status(200).send(aluno)
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Aluno não encontrado");
    });
}

module.exports.inserirAluno = function(req, res){
    Campus.exists({campus: req.body.campus})
    .then(campus => {
        if(campus){
            Aluno.exists({matricula: req.body.matricula})
            .then(aluno => {
                if(aluno){
                    res.status(500).send("Aluno ja existe no banco de dados");
                }
                else{
                    const aluno = new Aluno(req.body);
                    aluno
                    .save()
                    .then(res.status(200).send(aluno))
                    .catch((err => {
                        console.log(err);
                    }));  
                }    
            })
            .catch((err => {
                console.log(err);
            }))
        }
        else{
            res.status(404).send("Campus não existe");
        }   
    })
    .catch((err => {
        console.log(err);
    }))
}

module.exports.atualizarAluno = function(req, res){
    Campus.exists({campus: req.body.campus})
    .then(campus => {
        if(campus){
            Aluno.findOneAndUpdate({matricula:req.body.matricula}, {$set:{nome:req.body.nome, matricula:req.body.matricula, dataNas:req.body.dataNas, email: req.body.email, ddd:req.body.ddd, numero:req.body.numero, operadora:req.body.operadora, campus: req.body.campus, curso: req.body.curso}},{new:true})
            .then(old_aluno => {
                res.send(old_aluno)        
            })
            .catch(err => {
                console.log(err);
                res.status(404).send("Aluno não encontrado");
            });
        }
        else{
            res.status(404).send("Campus não existe");
        }
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports.removerAluno = function(req, res){
    Aluno.findOneAndRemove({matricula:req.params.matricula})
    .then(old_aluno => {
            res.send(old_aluno)
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Aluno não encontrado");
    });
}





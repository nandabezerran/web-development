const Aluno = require("../models/aluno")
const Campus = require("../models/campus")

module.exports.listaCampus = function(req, res){
    Campus.find({})
    .then(campus => {
        res.json(campus);
    })
    .catch(err => console.log(err));
}

module.exports.obterCampus = function(req, res){  
    Campus.find({codigo: req.params.codigo})
    .then(campus => {
        res.status(200).send(campus)
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Campus não encontrado");
    });
}

module.exports.inserirCampus = function(req, res){
    Campus.exists({campus: req.body.campus})
    .then(campus => {
        if(campus){
            res.status(500).send("Campus ja existe na base de dados");
        }
        else{
            if(req.body.cursos < 1){
                res.status(500).send("Necessario mais de um curso");
            }
            else{
                const campus = new Campus(req.body);
                campus
                .save()
                .then(res.status(200).send(campus))
                .catch((err => {
                    console.log(err);
                }));  
            }  
        }
    }) 
    .catch(err => {
        console.log(err); 
    })    
}

module.exports.atualizarCampus = function(req, res){
    if(req.body.cursos < 1){
        res.status(500).send("Menos de 1 curso");
    }
    else{
        Campus.findOneAndUpdate({codigo:req.params.codigo}, {$set:{campus:req.body.campus, cursos:req.body.cursos}},{new:true})
        .then(old_campus => {
            res.send(old_campus)        
        })
        .catch(err => {
            console.log(err);
            res.status(404).send("Campus não encontrado");
        });
    }
}

module.exports.removerCampus = function(req, res){
    Campus.findOneAndRemove({codigo:req.params.codigo})
    .then(old_campus => {
        console.log(old_campus.campus);
        Aluno.deleteMany({campus: old_campus.campus}, function (err, _) {
            if (err) {
                return console.log(err);
            }
        });
        res.send(old_campus)
    })
    .catch(err => {
        console.log(err);
        res.status(404).send("Campus não encontrado");
    });  
}




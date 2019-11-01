const controller = require("../controller/alunos.js");

module.exports = function(app){
    app.get("/api/alunos", controller.listaAlunos);
    app.get("/api/alunos/:matricula", controller.obterAluno);
    app.post("/api/alunos", controller.inserirAluno);
    app.delete("/api/alunos/:matricula", controller.removerAluno);

    app.put("/api/alunos/:matricula", controller.atualizarAluno);
    
}


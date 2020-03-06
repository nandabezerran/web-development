const controller = require("../controller/campus.js");

module.exports = function(app){
    app.get("/api/campus", controller.listaCampus);
    app.get("/api/campus/:codigo", controller.obterCampus);
    app.post("/api/campus", controller.inserirCampus);
    app.put("/api/campus/:codigo", controller.atualizarCampus);
    app.delete("/api/campus/:codigo", controller.removerCampus);

}

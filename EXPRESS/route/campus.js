const controller = require("../controller/campus.js");

module.exports = function(app){
    app.get("/api/campi", controller.listaCampi);
    app.get("/api/campi/:codigo", controller.obterCampi);
    app.post("/api/campi", controller.inserirCampi);
    app.put("/api/campi/:codigo", controller.atualizarCampi);
    app.delete("/api/campi/:codigo", controller.removerCampi);

}

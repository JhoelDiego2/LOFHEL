var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.put("/atualizar", function (req, res) {
    empresaController.atualizar(req, res);
});

router.delete("/deletar", function (req, res) {
    empresaController.deletar(req, res);
});

router.get("/pegar_cargos/:fkVinicola", function (req, res) {
  empresaController.pegar_cargos(req, res);
});

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

module.exports = router;
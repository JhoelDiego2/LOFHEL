var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/cadastrar_vinicola", function (req, res) {
    usuarioController.cadastrar_vinicola(req, res);
})
router.post("/cadastrar_representante_cargo", function (req, res) {
    usuarioController.cadastrar_representante_cargo(req, res);
})
router.post("/cadastrar_cargo_permissao", function (req, res) {
    usuarioController.cadastrar_cargo_permissao(req, res);
})
router.post("/cadastrar_representante", function (req, res) {
    usuarioController.cadastrar_representante(req, res);
})

router.post("/cadastrar_funcionario", function (req, res) {
    usuarioController.cadastrar_funcionario(req, res);
})

router.put("/atualizar_funcionario", function (req, res) {
    usuarioController.atualizar_funcionario(req, res);
})

router.delete("/deletar_funcionario", function (req, res) {
    usuarioController.deletar_funcionario(req, res);
})

module.exports = router;
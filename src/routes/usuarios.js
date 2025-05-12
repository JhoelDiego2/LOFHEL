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



module.exports = router;
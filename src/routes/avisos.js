var express = require("express");
var router = express.Router();

var avisoController = require("../controllers/avisoController");

router.get("/status_sensores/:ifkArmazem", function (req, res) {
    avisoController.status_sensores(req, res);
});
router.get("/status_sensores_geral", function (req, res) {
    avisoController.status_sensores_geral(req, res);
});

router.get("/pegar_parametros/:fkArmazem", function (req, res) {
    avisoController.pegar_parametros(req, res);
});

router.get("/pegar_alertas_gerais", function (req, res) {
    avisoController.pegar_alertas_gerais(req, res);
});

router.get("/pegar_alertas_especifico/:fkArmazem", function (req, res) {
    avisoController.pegar_alertas_especifico(req, res);
});
router.get("/pegar_valores_kpi/:fkArmazem", function (req, res) {
    avisoController.kpi_alerta(req, res);
});
module.exports = router;
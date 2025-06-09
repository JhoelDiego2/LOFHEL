var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:fkArmazem", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:fkArmazem", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/alertas_hoje/:fkVinicola", function (req, res) {
    medidaController.alertas_hoje(req, res);
})
router.get("/alertas_semana/:fkVinicola", function (req, res) {
    medidaController.alertas_semana(req, res);
})
router.get("/total_critico/:fkVinicola", function (req, res) {
    medidaController.total_critico(req, res);
})
router.get("/total_alerta/:fkVinicola", function (req, res) {
    medidaController.total_alerta(req, res);
})

module.exports = router;
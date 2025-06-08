const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');

// Alertas e informações principais do Dashboard
router.get('/tempo-real/:fkArmazem', dashboardController.alertasTempoReal);
router.get('/persistentes/:fkArmazem', dashboardController.alertasPersistentes);
router.get('/hoje/:fkArmazem', dashboardController.alertasHoje);
router.get('/semana/:fkArmazem', dashboardController.alertasSemana);
router.get('/registros/:idSensor', dashboardController.registrosPorSensor);

module.exports = router;
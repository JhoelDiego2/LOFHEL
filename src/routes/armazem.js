var express = require("express");
var router = express.Router();

var armazemController = require("../controllers/armazemController");

router.get("/buscarArmazem/:fkVinicola", function (req, res) {
  armazemController.buscarArmazemEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  armazemController.cadastrar(req, res);
})


router.post("/cadastroArmazem", function (req, res) {
  armazemController.cadastroArmazem(req, res);
})
module.exports = router;
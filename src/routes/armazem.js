var express = require("express");
var router = express.Router();

var armazemController = require("../controllers/armazemController");

router.get("/buscarArmazem/:fkVinicola", function (req, res) {
  armazemController.buscarArmazemEmpresa(req, res);
});


router.post("/cadastroArmazem", function (req, res) {
  armazemController.cadastroArmazem(req, res);
})

router.delete("/removerArmazem", function (req, res) {
  armazemController.removerArmazem(req, res);
})
module.exports = router;
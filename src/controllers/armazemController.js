var armazemModel = require("../models/armazemModel");

function buscarArmazemEmpresa(req, res) {
  var fkVinicola = req.params.fkVinicola;

  armazemModel.buscarArmazemEmpresa(fkVinicola).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var descricao = req.body.descricao;
  var idFuncionario = req.body.idFuncionario;
  /*idFuncionario */

  if (descricao == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idFuncionario == undefined) {
    res.status(400).send("idFuncionario está undefined!");
  } else {


    armazemModel.cadastrar(descricao, idFuncionario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastroArmazem(req, res) {
  var nomeArmazem = req.body.armazemNomeServer;
  var fkVinicola = req.body.fkVinicolaServer;
  var fkGrupoVinho = req.body.selecionarServer;


  if (nomeArmazem == undefined) {
    res.status(400).send("nomeArmazem está undefined!");
  } else if (fkVinicola == undefined) {
    res.status(400).send("fkVinicola está undefined!");
  } else if (fkGrupoVinho == undefined) {
    res.status(400).send("fkGrupoVinho está undefined!");
  }else {

    armazemModel.cadastroArmazem(nomeArmazem, fkVinicola, fkGrupoVinho )
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function removerArmazem(req, res) {
  var fkArmazem = req.body.fkArmazemServer;
  var senha = req.body.senha;
  var idFuncionario = req.body.idFuncionario;


  if (fkArmazem == undefined) {
    res.status(400).send("fkArmazem está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("fkVinicola está undefined!");
  }else {

    armazemModel.removerArmazem(fkArmazem, senha, idFuncionario)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}




module.exports = {
  buscarArmazemEmpresa,
  cadastrar,
  cadastroArmazem, 
  removerArmazem
}
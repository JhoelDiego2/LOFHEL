var empresaModel = require("../models/empresaModel");

function pegar_cargos(req, res) {
  var fkVinicola = req.params.fkVinicola

  empresaModel.pegar_cargos(fkVinicola).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeArmazem = req.body.nomeArmazemServer;
    var permissoes = req.body.permissoesServer;
    var fkVinicola = req.body.fkVinicolaServer;

    // Faça as validações dos valores
    if (nomeArmazem == undefined) {
        res.status(400).send("Seu nomeArmazem está undefined!");
    } else if (permissoes == undefined) {
        res.status(400).send("Seu permissoes está undefined!");
    }else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        empresaModel.cadastrar(nomeArmazem, permissoes, fkVinicola )
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idCargo = req.body.nomeArmazemServer;
    var novasPermissoes = req.body.permissoesServer;
    var novoNome = req.body.nomeNovoServer;


    if (idCargo == undefined) {
        res.status(400).send("Seu idCargo está undefined!");
    } else if (novasPermissoes == undefined) {
        res.status(400).send("Seu novasPermissoes está undefined!");
    }else if (novasPermissoes == undefined) {
        res.status(400).send("Seu novasPermissoes está undefined!");
    }else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        empresaModel.atualizar(idCargo, novasPermissoes, novoNome)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function deletar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idFuncionario = req.body.idFuncionarioServer;
    var idCargo = req.body.idCargoServer;
    var senha = req.body.senhaServer;


    if (idFuncionario == undefined) {
        res.status(400).send("Seu idFuncionario está undefined!");
    } else if (idCargo == undefined) {
        res.status(400).send("Seu idCargo está undefined!");
    }else if (senha == undefined) {
        res.status(400).send("Seu idCargo está undefined!");
    }else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        empresaModel.deletar(idFuncionario, idCargo, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
module.exports = {
  pegar_cargos,
  buscarPorId,
  cadastrar,
  listar,
  atualizar,
  deletar,
};

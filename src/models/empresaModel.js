var database = require("../database/config");

function pegar_cargos(fkVinicola) {
  var instrucaoSql = `
  SELECT DISTINCT c.nomeCargo, c.idCargo
  FROM Cargo c
  JOIN CargoPermissao cp ON cp.fkCargo = c.idCargo
  WHERE cp.statusCargo = 'Ativo' AND c.fkVinicola = "${fkVinicola}";
`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nomeArmazem, permissoes, fkVinicola) {

  var instrucaoSql = `INSERT INTO Cargo (nomeCargo, fkVinicola) VALUES ('${nomeArmazem}', ${fkVinicola})`;

  return database.executar(instrucaoSql).then((resultadoVinicola) => {
    let fkCargo = resultadoVinicola.insertId;
    var values = []
    for (let i = 0; i < permissoes.length; i++) {
      values.push(`(${fkCargo}, ${permissoes[i]})`)
    }
    var instrucaoPermissao = `INSERT INTO CargoPermissao (fkCargo, fkPermissao) VALUES
          ${values};

       `
    return database.executar(instrucaoPermissao);

  })
}


function atualizar(idCargo, novasPermissoes, novoNome) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ", idCargo, novasPermissoes, novoNome)

  var instrucaoSql = `UPDATE Cargo SET nomeCargo = '${novoNome}' where idCargo = ${idCargo}`;

  return database.executar(instrucaoSql).then((resultadoNome) => {
    var instrucaoDelete = `DELETE FROM CargoPermissao WHERE fkCargo = ${idCargo};
       `
    return database.executar(instrucaoDelete).then((resultadoDelete) => {
      var values = []
      for (let i = 0; i < novasPermissoes.length; i++) {
        values.push(`(${idCargo}, ${novasPermissoes[i]})`)
      }
      var instrucaoPermissao = `INSERT INTO CargoPermissao (fkCargo, fkPermissao) VALUES
            ${values};

       `
      return database.executar(instrucaoPermissao);

    })

  })
}


function deletar(idFuncionario, idCargo, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizar(): ", idFuncionario, idCargo, senha)

  var instrucaoSql = `SELECT senha from Funcionario where idFuncionario = ${idFuncionario}`;

  return database.executar(instrucaoSql).then((resultadoSelect) => {

    if (resultadoSelect[0].senha == senha) {
      var instrucaoDelete = `DELETE FROM CargoPermissao WHERE fkCargo = ${idCargo};
       `
      return database.executar(instrucaoDelete).then((resultadoDelete) => {
        var intrucao_delete_2 = `DELETE FROM  Cargo WHERE idCargo = ${idCargo};

       `
        return database.executar(intrucao_delete_2);

      })
    } else {
      return database.executar(instrucaoDelete)
    }
  })
}
module.exports = { buscarPorCnpj, pegar_cargos, cadastrar, listar, atualizar, deletar };

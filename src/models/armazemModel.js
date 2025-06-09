var database = require("../database/config");

function buscarArmazemEmpresa(fkVinicola) {

  var instrucaoSql = `SELECT * FROM Armazem a WHERE fkVinicola = ${fkVinicola}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(fkVinicola, descricao) {

  var instrucaoSql = `INSERT INTO Armazem (descricao, fk_empresa)  VALUES (${descricao}, ${fkVinicola})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastroArmazem(nomeArmazem, fkVinicola, fkGrupoVinho) { /*RETIRADOO ID PQ É AUTOINCREMENT */
  var instrucaoSql = `INSERT INTO Armazem (nomeArmazem, fkVinicola, fkGrupoVinho) VALUES (
 '${nomeArmazem}' , ${fkVinicola},${fkGrupoVinho})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql).then((result) => {
    var fkArmazem = result.insertId
        var instrucaoSql = `INSERT INTO Sensor (fkArmazem) VALUES (
          ${fkArmazem});`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
  })

}

function removerArmazem(fkArmazem, senha, idFuncionario) { /*RETIRADOO ID PQ É AUTOINCREMENT */
  var instrucaoSql = `SELECT senha from Funcionario where idFuncionario = ${idFuncionario}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql).then((result) => {

    if (result[0].senha == senha) {
      var instrucaoSql_2 = `DELETE from Sensor where fkArmazem = ${fkArmazem}`;
      console.log("Executando a instrução SQL: \n" + instrucaoSql_2);
      return database.executar(instrucaoSql_2).then((result_2) => {

        var instrucaoSql_3 = `DELETE from Armazem where idArmazem = ${fkArmazem}`;
        console.log("Executando a instrução SQL: \n" + instrucaoSql_3);
        return database.executar(instrucaoSql_3)
      })
    }else{
      console.log('Senha Errada')
    }

  })

}

module.exports = {
  buscarArmazemEmpresa,
  cadastrar,
  cadastroArmazem,
  removerArmazem
}

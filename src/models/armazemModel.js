var database = require("../database/config");

function buscarArmazemEmpresa(fkVinicola) {

  var instrucaoSql = `SELECT * FROM Armazem a WHERE fkVinicola = ${fkVinicola}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(fkVinicola, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fk_empresa) Armazem VALUES (${descricao}, ${fkVinicola})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastroArmazem (nomeArmazem, fkVinicola, fkGrupoVinho){ /*RETIRADOO ID PQ É AUTOINCREMENT */
  var instrucaoSql = `INSERT INTO (nomeArmazem, fkVinicola, fkGrupoVinho) Armazem VALUES (
  ${nomeArmazem} , ${fkVinicola},${fkGrupoVinho})`;

   console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);

}

module.exports = {
  buscarArmazemEmpresa,
  cadastrar,
  cadastroArmazem
}

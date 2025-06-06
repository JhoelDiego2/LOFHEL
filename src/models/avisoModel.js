var database = require("../database/config");

function status_sensores(fkArmazem) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
    select count(s.idSensor) as total_sensores, 
        (select count(s.idSensor) from Sensor as s where statusSensor = 'Ativo' and s.fkArmazem = ${fkArmazem} ) as total_sensor_ativo, 
            (select count(s.idSensor) from Sensor as s where statusSensor = 'Inativo'  and s.fkArmazem = ${fkArmazem}) as total_sensor_inativo
        from Sensor as s 
        join Armazem as a on s.fkArmazem = a.idArmazem 
        where a.idArmazem = ${fkArmazem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegar_parametros(fkArmazem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucaoSql = `
        select GrupoVinho.* from GrupoVinho 
            join Armazem on Armazem.fkGrupoVinho = GrupoVinho.idGrupoVinho 
            where Armazem.idArmazem = ${fkArmazem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function pegar_alertas_gerais() {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucaoSql = `
       select * from vw_AlertasPersistentes;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function pegar_alertas_especifico(fkArmazem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucaoSql = `
       select * from vw_AlertasPersistentes where fkArmazem = ${fkArmazem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    status_sensores,
    pegar_parametros,
    pegar_alertas_gerais,
    pegar_alertas_especifico,
}

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

function status_sensores_geral() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
SELECT 
    COUNT(s.idSensor) AS total_sensores,
    SUM(CASE WHEN s.statusSensor = 'Ativo' THEN 1 ELSE 0 END) AS total_sensor_ativo,
    SUM(CASE WHEN s.statusSensor = 'Inativo' THEN 1 ELSE 0 END) AS total_sensor_inativo,
    ROUND(SUM(CASE WHEN s.statusSensor = 'Ativo' THEN 1 ELSE 0 END) / COUNT(s.idSensor) * 100, 2) AS porcentagem_ativo,
    ROUND(SUM(CASE WHEN s.statusSensor = 'Inativo' THEN 1 ELSE 0 END) / COUNT(s.idSensor) * 100, 2) AS porcentagem_inativo
FROM Sensor AS s;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegar_parametros(fkArmazem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegar_parametros()");
    var instrucaoSql = `
        select GrupoVinho.* from GrupoVinho 
            join Armazem on Armazem.fkGrupoVinho = GrupoVinho.idGrupoVinho 
            where Armazem.idArmazem = ${fkArmazem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function pegar_alertas_gerais() {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegar_alertas_gerais()");
    var instrucaoSql = `
SELECT nomeArmazem, statusAlerta, DATE_FORMAT(dataHora,'%d/%m/%y %H:%i:%s') as inicioAlerta,
       temperatura, umidade, nivelAlertaUmidade, nivelAlertaTemperatura
FROM vw_AlertaEmTempoReal2
WHERE statusAlerta <> 'Normal' COLLATE utf8mb4_unicode_ci
ORDER BY dataHora DESC
LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function pegar_alertas_especifico(fkArmazem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegar_alertas_especifico()");
    var instrucaoSql = `
select nomeArmazem, statusAlerta, DATE_FORMAT(inicioAlerta,'%d/%m/%y %H:%i:%s') as inicioAlerta, minutosEmAlerta, valorCapturado from vw_AlertasPersistentes where fkArmazem = ${fkArmazem} AND minutosEmAlerta is not null;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function min_total_alerta_hoje(fkArmazem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function min_total_alerta_hoje()");
    var instrucaoSql = `
       SELECT 
            SUM(minutosEmAlerta) AS min_fora_hoje,
            COUNT(inicioAlerta) AS total_alertas_hoje
        FROM vw_AlertasPersistentes
        WHERE inicioAlerta >= CURDATE()
        AND inicioAlerta < CURDATE() + INTERVAL 1 DAY
        AND fkArmazem = ${fkArmazem};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function total_alertas_na_semana(fkArmazem) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function total_alertas_na_semana()");
    var instrucaoSql = `
        SELECT 
            COUNT(*) as total_alertas_semana
        FROM vw_AlertaEmTempoReal
        WHERE statusAlerta COLLATE utf8mb4_unicode_ci <> 'Normal' COLLATE utf8mb4_unicode_ci
        AND dataHora >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        AND dataHora <= NOW()
        AND fkArmazem =  ${fkArmazem};
            `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    status_sensores,
    pegar_parametros,
    pegar_alertas_gerais,
    pegar_alertas_especifico,
    min_total_alerta_hoje, 
    total_alertas_na_semana, 
    status_sensores_geral,
}

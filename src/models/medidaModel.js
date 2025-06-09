var database = require("../database/config");

function buscarUltimasMedidas(fkArmazem, limite_linhas) {

    var instrucaoSql = `
        SELECT temperatura, umidade, DATE_FORMAT(dataHora,'%d/%m %H:%i:%s') AS dataHora
	        FROM Registro r JOIN Sensor s ON r.fkSensor = s.idSensor
	    	JOIN Armazem a on s.fkArmazem = a.idArmazem
         WHERE s.fkArmazem = ${fkArmazem}
                    ORDER BY r.idRegistro DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fkArmazem, limite_linhas) {

    var instrucaoSql = `
            SELECT temperatura, umidade,  DATE_FORMAT(dataHora,'%d/%m %H:%i:%s') AS dataHora
	                FROM Registro r JOIN Sensor s ON r.fkSensor = s.idSensor
	            	JOIN Armazem a on s.fkArmazem = a.idArmazem
         WHERE s.fkArmazem = ${fkArmazem}
                    ORDER BY r.idRegistro DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alertas_hoje(fkVinicola) {

    var instrucaoSql = `
            SELECT COUNT(*) AS alertas_hoje
FROM vw_AlertasPersistentes
WHERE DATE(inicioAlerta) = CURDATE() and fkVinicola = ${fkVinicola};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alertas_semana(fkVinicola) {

    var instrucaoSql = `
SELECT COUNT(*) AS alertas_semana
FROM vw_AlertasPersistentes
WHERE YEARWEEK(inicioAlerta, 1) = YEARWEEK(CURDATE(), 1)
  AND fkVinicola = ${fkVinicola};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function total_critico(fkVinicola) {

    var instrucaoSql = `
SELECT COUNT(*) AS total_critico
FROM vw_AlertaEmTempoReal2
WHERE (
    nivelAlertaTemperatura COLLATE utf8mb4_unicode_ci = 'Critico' COLLATE utf8mb4_unicode_ci
    OR
    nivelAlertaUmidade COLLATE utf8mb4_unicode_ci = 'Critico' COLLATE utf8mb4_unicode_ci
)
 and fkVinicola = ${fkVinicola};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function total_alerta(fkVinicola) {

var instrucaoSql = `
SELECT COUNT(*) AS total_alerta
FROM vw_AlertaEmTempoReal2
WHERE 
  (nivelAlertaTemperatura COLLATE utf8mb4_unicode_ci = 'Alerta' COLLATE utf8mb4_unicode_ci
   OR
   nivelAlertaUmidade COLLATE utf8mb4_unicode_ci = 'Alerta' COLLATE utf8mb4_unicode_ci)
AND fkVinicola = ${fkVinicola};
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal, 
    alertas_hoje, 
    alertas_semana, 
    total_critico, 
    total_alerta, 
}

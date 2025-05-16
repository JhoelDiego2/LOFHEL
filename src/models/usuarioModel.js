var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT f.idFuncionario, f.nomeFuncionario, f.email, f.telefone, f.fkCargo,
		v.idVinicola, v.nomeFantasia, 
			 c.nomeCargo,
    GROUP_CONCAT(DISTINCT cp.fkPermissao ) AS fkPermissoes
		FROM Vinicola v JOIN Funcionario f on v.idVinicola = f.fkVinicola
			JOIN Cargo c on c.idCargo = f.fkCargo
				JOIN CargoPermissao cp ON cp.fkCargo = c.idCargo
		WHERE email = '${email}' AND senha = '${senha}';
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar_vinicola(nomeFantasia, razaoSocial, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_vinicola():", nomeFantasia, razaoSocial, cnpj);
    var instrucaoSql = `
        INSERT INTO Vinicola (nomeFantasia, razaoSocial, cnpj) VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}')
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar_representante_cargo(fkVinicola) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_representante():", fkVinicola);
    var instrucaoSql = `
        INSERT INTO Cargo (nomeCargo, fkVinicola) VALUES ('Representante Legal', '${fkVinicola}');
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function cadastrar_cargo_permissao(fkCargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_representante():", fkCargo, );
    var instrucaoSql = `
        INSERT INTO CargoPermissao (fkCargo, fkPermissao) VALUES 
            ('${fkCargo}', 1),
            ('${fkCargo}', 2),
            ('${fkCargo}', 3),
            ('${fkCargo}', 4);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function cadastrar_representante(nome, email, telefone, senha, fkVinicola, fkCargo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar_representante():", nome, email, telefone, senha, fkVinicola, fkCargo);
    var instrucaoSql = `
        INSERT INTO Funcionario (nomeFuncionario, email,telefone, senha, fkVinicola, fkCargo) VALUES ('${nome}', '${email}', '${telefone}', '${senha}', '${fkVinicola}', '${fkCargo}')
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    autenticar,
    cadastrar_vinicola,
    cadastrar_representante_cargo,
    cadastrar_cargo_permissao,
    cadastrar_representante,
};
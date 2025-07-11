var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        Select * from vw_informacoes_login vw
            join Funcionario f on f.idFuncionario = vw.idFuncionario
            WHERE vw.email = '${email}' AND f.senha = '${senha}';
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function cadastrarCompleto(nomeFantasia, razaoSocial, cnpj, nomeFuncionario, email, telefone, senha) {
    // 1. Cadastrar vinícola
    var instrucaoVinicola = `
        INSERT INTO Vinicola (nomeFantasia, razaoSocial, cnpj)
        VALUES ('${nomeFantasia}', '${razaoSocial}', '${cnpj}');
    `;

    return database.executar(instrucaoVinicola).then((resultadoVinicola) => {
        let fkVinicola = resultadoVinicola.insertId;

        // 2. Cadastrar cargo
        var instrucaoCargo = `
            INSERT INTO Cargo (nomeCargo, fkVinicola)
            VALUES ('Representante Legal', ${fkVinicola});
        `;

        return database.executar(instrucaoCargo).then((resultadoCargo) => {
            let fkCargo = resultadoCargo.insertId;

            // 3. Cadastrar permissões
            var instrucaoPermissao = `
                INSERT INTO CargoPermissao (fkCargo, fkPermissao) VALUES
                    (${fkCargo}, 1),
                    (${fkCargo}, 2),
                    (${fkCargo}, 3),
                    (${fkCargo}, 4);
            `;

            return database.executar(instrucaoPermissao).then(() => {
                // 4. Cadastrar funcionário
                var instrucaoFuncionario = `
                    INSERT INTO Funcionario (nomeFuncionario, email, telefone, senha, fkCargo)
                    VALUES ('${nomeFuncionario}', '${email}', '${telefone}', '${senha}', ${fkCargo});
                `;

                return database.executar(instrucaoFuncionario);
            });
        });
    });
}

function cadastrar_funcionario(nomeFuncionario, email, telefone, fkCargo, senha) {
    var instrucaoFuncionario = `
        INSERT INTO Funcionario (nomeFuncionario, email, telefone, fkCargo, senha) VALUES 
        ('${nomeFuncionario}', '${email}', '${telefone}', ${fkCargo}, '${senha}');
    `
    return database.executar(instrucaoFuncionario);
}

function atualizar_funcionario(params) {
    
}

function deletar_funcionario(email, idUsuario, senha) {

    var instrucaoSQL =
        `SELECT senha FROM Funcionario WHERE idFuncionario = ${idUsuario};`
    return database.executar(instrucaoSQL).then((resultadoSelect) => {
        if (resultadoSelect[0].senha == senha) {
            var instrucao2 =
                `DELETE FROM Funcionario WHERE email = '${email}' AND idFuncionario >= 1;`
                return database.executar(instrucao2);
        }
    })
}
   

module.exports = {
    autenticar,
    cadastrarCompleto,
    cadastrar_funcionario,
    atualizar_funcionario,
    deletar_funcionario
};

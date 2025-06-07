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
                    INSERT INTO Funcionario (nomeFuncionario, email, telefone, senha, fkVinicola, fkCargo)
                    VALUES ('${nomeFuncionario}', '${email}', '${telefone}', '${senha}', ${fkVinicola}, ${fkCargo});
                `;

                return database.executar(instrucaoFuncionario);
            });
        });
    });
}
module.exports = {
    autenticar,
    cadastrarCompleto
};

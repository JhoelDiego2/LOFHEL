var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    if (email == undefined) {
        res.status(400).send("seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        res.json({
                            idFuncionario: resultadoAutenticar[0].idFuncionario,
                            nomeFuncionario: resultadoAutenticar[0].nomeFuncionario,
                            email: resultadoAutenticar[0].email,
                            telefone: resultadoAutenticar[0].telefone,
                            fkCargo: resultadoAutenticar[0].fkCargo,
                            idVinicola: resultadoAutenticar[0].idVinicola,
                            nomeFantasia: resultadoAutenticar[0].nomeFantasia,
                            idCargo: resultadoAutenticar[0].idCargo,
                            nomeCargo: resultadoAutenticar[0].nomeCargo,
                            fkPermissoes: resultadoAutenticar[0].fkPermissoes,
                        });
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("usuario e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

async function cadastrar_vinicola(req, res) {
    const dados = req.body;

    try {
        await usuarioModel.cadastrarCompleto(
            dados.nomeFantasia,
            dados.razaoSocial,
            dados.cnpj,
            dados.nome,
            dados.email,
            dados.telefone,
            dados.senha
        );

        res.status(200).json({ mensagem: "Cadastro completo realizado!" });
    } catch (erro) {
        console.error("Erro ao cadastrar vinícola:", erro);
        res.status(500).json({ erro: "Erro ao cadastrar vinícola. Verifique o log do servidor." });
    }
}

function cadastrar_funcionario(req, res) {

    var nomeFuncionario = req.body.nomeFuncionarioServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var fkCargo = req.body.cargoServer;
    var senha = req.body.senhaServer;



    if (nomeFuncionario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (fkCargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar_funcionario(nomeFuncionario, email, telefone, fkCargo, senha)
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


function deletar_funcionario(req, res) {
    var email = req.body.emailServer;
    var idFuncionario = req.body.idFuncionarioServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.deletar_funcionario(email, idFuncionario, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a deleção do funcionario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar_vinicola,
    cadastrar_funcionario,
    deletar_funcionario
}
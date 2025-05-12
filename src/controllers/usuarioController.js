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

function cadastrar_vinicola(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeFantasia = req.body.nomeFantasiaServer;
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;

    // Faça as validações dos valores
    if (nomeFantasia == undefined) {
        res.status(400).send("Seu nomeFantasia está undefined!");
    } else if (razaoSocial == undefined) {
        res.status(400).send("Seu razaoSocial está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar_vinicola(nomeFantasia, razaoSocial, cnpj)
            .then(function (resultadoVinicola) {
                var fkVinicola = resultadoVinicola.insertId;
                var nome = req.body.nomeServer;
                var telefone = req.body.telefoneServer;
                var email = req.body.emailServer;
                var senha = req.body.senhaServer;
                if (fkVinicola == undefined) {
                    res.status(400).send("Seu fkVinicol está undefined!");
                } else if (nome == undefined) {
                    res.status(400).send("Seu nome está undefined!");
                } else if (telefone == undefined) {
                    res.status(400).send("Sua telefone está undefined!");
                } else if (email == undefined) {
                    res.status(400).send("Sua email está undefined!");
                } else if (senha == undefined) {
                    res.status(400).send("Sua senha está undefined!");
                } else {
                    // Suponha que você tenha um endereço padrão para cadastrar junto
                    return usuarioModel.cadastrar_representante(nome, email, telefone, senha, fkVinicola);
                }
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

module.exports = {
    autenticar,
    cadastrar_vinicola, 
}
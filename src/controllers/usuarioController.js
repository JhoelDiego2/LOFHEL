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
    var nomeFantasia = req.body.nomeFantasiaServer;
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;

    if (nomeFantasia == undefined) {
        res.status(400).send("O campo 'nomeFantasia' está indefinido!");
    } else if (razaoSocial == undefined) {
        res.status(400).send("O campo 'razaoSocial' está indefinido!");
    } else if (cnpj == undefined) {
        res.status(400).send("O campo 'cnpj' está indefinido!");
    } else {
        usuarioModel.cadastrar_vinicola(nomeFantasia, razaoSocial, cnpj)
            .then(function (resultadoVinicola) {
                var fkVinicola = resultadoVinicola.insertId;
                var nome = req.body.nomeServer;
                var telefone = req.body.telefoneServer;
                var email = req.body.emailServer;
                var senha = req.body.senhaServer;

                if (fkVinicola == undefined) {
                    res.status(400).send("Erro interno: fkVinicola está indefinido!");
                } else if (nome == undefined) {
                    res.status(400).send("O campo 'nome' está indefinido!");
                } else if (telefone == undefined) {
                    res.status(400).send("O campo 'telefone' está indefinido!");
                } else if (email == undefined) {
                    res.status(400).send("O campo 'email' está indefinido!");
                } else if (senha == undefined) {
                    res.status(400).send("O campo 'senha' está indefinido!");
                } else {
                    usuarioModel.cadastrar_representante_cargo(fkVinicola)
                        .then(function (respostaRepresentanteCargo) {
                            var fkCargo = respostaRepresentanteCargo.insertId;

                            usuarioModel.cadastrar_cargo_permissao(fkCargo)
                                .then(function (respostaCargoPermissao) {
                                    usuarioModel.cadastrar_representante(nome, email, telefone, senha, fkVinicola, fkCargo)
                                        .then(function (resultadoRepresentante) {
                                            console.log("Representante cadastrado com sucesso.");
                                            res.status(201).json({ mensagem: "Vinícola e representante cadastrados com sucesso!" });
                                        }).catch(function (erro) {
                                            console.log(erro);
                                            console.log("\nErro ao cadastrar representante! Erro:", erro.sqlMessage);
                                            res.status(500).json({ mensagem: "Erro ao cadastrar representante.", erro: erro.sqlMessage });
                                        });
                                }).catch(function (erro) {
                                    console.log(erro);
                                    console.log("\nErro ao cadastrar cargo e permissão! Erro:", erro.sqlMessage);
                                    res.status(500).json({ mensagem: "Erro ao cadastrar cargo/permissão.", erro: erro.sqlMessage });
                                });
                        }).catch(function (erro) {
                            console.log(erro);
                            console.log("\nErro ao cadastrar cargo de representante! Erro:", erro.sqlMessage);
                            res.status(500).json({ mensagem: "Erro ao cadastrar cargo de representante.", erro: erro.sqlMessage });
                        });
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro da vinícola! Erro:", erro.sqlMessage);
                res.status(500).json({ mensagem: "Erro ao cadastrar vinícola.", erro: erro.sqlMessage });
            });
    }
}

module.exports = {
    autenticar,
    cadastrar_vinicola,
}
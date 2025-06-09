var avisoModel = require("../models/avisoModel");

function status_sensores(req, res) {
    var fkArmazem = req.params.fkArmazem;

    avisoModel.status_sensores(fkArmazem)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function status_sensores_geral(req, res) {

    avisoModel.status_sensores_geral()
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pegar_parametros(req, res) {
    var fkArmazem = req.params.fkArmazem;

    avisoModel.pegar_parametros(fkArmazem)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function pegar_alertas_gerais(req, res) {

    avisoModel.pegar_alertas_gerais()
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function pegar_alertas_especifico(req, res) {
    var fkArmazem = req.params.fkArmazem;

    avisoModel.pegar_alertas_especifico(fkArmazem)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function kpi_alerta(req, res) {
    var fkArmazem = req.params.fkArmazem;

    avisoModel.min_total_alerta_hoje(fkArmazem)
        .then(
            function (resultado) {
                if (resultado.length == 0) {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
                avisoModel.total_alertas_na_semana(fkArmazem)
                    .then(
                        function (resultado_semana) {
                            if (resultado_semana.length == 0) {
                                res.status(204).send("Nenhum resultado encontrado!");
                            }
                            res.json({
                                resultado_hoje: resultado, 
                                resultado_semana: resultado_semana
                            });

                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            console.log("Houve um erro ao buscar total_semana: ", erro.sqlMessage);
                            res.status(500).json(erro.sqlMessage);
                        }
                    );
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os total_hoje: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
module.exports = {
    status_sensores,
    pegar_parametros,
    pegar_alertas_gerais,
    pegar_alertas_especifico,
    kpi_alerta,
    status_sensores_geral,
}
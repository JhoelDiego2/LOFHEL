var medidaModel = require("../models/medidaModel");
var avisoModel = require("../models/avisoModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 24;

    var fkArmazem = req.params.fkArmazem;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(fkArmazem, limite_linhas)
    .then(function (resultado) {
        if (resultado.length > 0) {
                avisoModel.status_sensores(fkArmazem)
                    .then(
                        function (resultado_sensores) {
                            if (resultado_sensores.length > 0) {
                                res.status(200).json({
                                    resultado_medidas: resultado,
                                    resultado_sensores: resultado_sensores
                                });
                            } else {
                                res.status(204).send("Nenhum resultado encontrado!");
                            }
                        }
                    )
                    .catch(
                        function (erro_sensores) {
                            console.log(erro_sensores);
                            console.log(
                                "Houve um erro_sensores ao buscar os avisos: ",
                                erro_sensores.sqlMessage
                            );
                            res.status(500).json(erro_sensores.sqlMessage);
                        }
                    );
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
    
}


function buscarMedidasEmTempoReal(req, res) {

    var fkArmazem = req.params.fkArmazem;
    const limite_linhas = 1;


    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(fkArmazem, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal

}
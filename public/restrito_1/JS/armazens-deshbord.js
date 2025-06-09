function obterArmazens() {
    const select_arm = document.getElementById('armazem_atual')
    const fkVinicola = sessionStorage.ID_VINICOLA
    fetch(`/armazem/buscarArmazem/${fkVinicola}`, { cache: 'no-store' }).then(function (response) {
        console.log(response)
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                sessionStorage.ARMAZENS = JSON.stringify(resposta);
                select_arm.innerHTML = ''
                select_arm.innerHTML += '<option value="geral" style="color:black; background-color: white">Geral</option>'
                document.getElementById('b_total_armazem').innerHTML = resposta.length
                for (let i = 0; i < resposta.length; i++) {
                    select_arm.innerHTML += `
                        <option value="${resposta[i].idArmazem}" style="color:black; background-color: white"  >${resposta[i].nomeArmazem}</option>
                        `
                }
                select_arm.value = 'geral'
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function pegar_alertas_gerais() {
    fetch(`/avisos/pegar_alertas_gerais`, { cache: 'no-store' }).then(function (response) {
        console.log(response)
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                for (let i = 0; i < resposta.length; i++) {
                    var ocorrencia = resposta[i]

                    var icone = "";
                    if (ocorrencia.statusAlerta === "Crítico") {
                        icone = "../imagens-deshbord/alert-critico.png";
                    } else if (ocorrencia.statusAlerta === "Atenção") {
                        icone = "https://cdn-icons-png.flaticon.com/512/257/257195.png";
                    } else {
                        icone = "https://img.freepik.com/vetores-premium/icone-de-avisos-de-notificacao_1076610-18996.jpg?semt=ais_hybrid&w=740";
                    }
                    var valor = ''
                    var alerta = ''
                    if ((ocorrencia.statusAlerta).includes('Temperatura')) {
                        valor = ocorrencia.temperatura;
                        valor += ' °C'
                        alerta = ocorrencia.nivelAlertaTemperatura
                    } else {
                        valor = ocorrencia.umidade;
                        valor += ' %'
                        alerta = ocorrencia.nivelAlertaUmidade

                    }
                    document.getElementById('containerHistoricoAlertas').innerHTML += `
                    <a >
                        <div class="history"> 
                            <img src="${icone}" alt=""> 
                            <div class="data-history"> 
                            <h4> ${ocorrencia.statusAlerta} - ${ocorrencia.nomeArmazem} - ${alerta} </h4> 
                            <p> Valor Capturado${valor}</p>
                            </div>
                                <p class="datatime-history">${ocorrencia.inicioAlerta}</p>
                        </div>
                    </a>
                `;

                }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
var respsta_primeira = {}
let primeira_vez_status = true
window.addEventListener('load', obterArmazens)
window.addEventListener('load', obter_status_sensor)
window.addEventListener('load', pegar_alertas_gerais)

function obter_status_sensor() {
    fetch(`/avisos/status_sensores_geral`, { cache: 'no-store' }).then(function (response) {
        console.log(response)
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                if (primeira_vez_status) {
                    respsta_primeira = resposta
                    primeira_vez_status = false
                    plotarGrafico(resposta)
                } else if (respsta_primeira[0].porcentagem_ativo != resposta[0].porcentagem_ativo) {
                    plotarGrafico(resposta)
                }



            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function plotarGrafico(resposta) {

    if (Chart.getChart('status_sensores')) {
        Chart.getChart('status_sensores').destroy();
    }
    var registro = resposta[0];
    const label_satus = ['Ativo', 'Inativo']
    const data_status = {
        labels: label_satus,
        datasets: [{
            label: 'Status (%): ',
            data: [registro.porcentagem_ativo, registro.porcentagem_inativo],
            borderColor: '#551c36',
            backgroundColor: '#551c36',
            tension: 0.1
        },
        ]
    };
    const config_status = {
        type: 'doughnut',
        data: data_status,
        options: {
            responsive: false,
            cutout: '40%', // ← aqui você define o "raio interno"
            radius: '90%',// tamanho externo
            plugins: {
                legend: {
                    position: 'right', // Coloca a legenda embaixo do gráfico
                    labels: {
                        color: 'black', // Cor da fonte da legenda
                        font: {
                            size: 18
                        }
                    }
                },
            }
        }
    };

    const ctx_umidade_atual = document.getElementById('status_sensores').getContext('2d');
    let GraficoStatus = new Chart(ctx_umidade_atual, config_status);




    setTimeout(() => {
        obter_status_sensor(data_status, GraficoStatus)
    }, 2000);

}
function alertas_hoje(fkVinicola) {
    fetch(`/medidas/alertas_hoje/${fkVinicola}`, { cache: 'no-store' }).then(function (response) {
        console.log(response)
        if (response.ok) {

            response.json().then(function (resposta) {
                document.getElementById('b_alertas_hoje').innerHTML = resposta[0].alertas_hoje
                setTimeout(() => alertas_hoje(fkVinicola), 1000)

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            setTimeout(() => alertas_hoje(fkVinicola), 1000)

        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function alertas_semana(fkVinicola) {
    fetch(`/medidas/alertas_semana/${fkVinicola}`, { cache: 'no-store' }).then(function (response) {
        console.log(response)
        if (response.ok) {

            response.json().then(function (resposta) {
                document.getElementById('b_alertas_semana').innerHTML = resposta[0].alertas_semana

                setTimeout(() => alertas_semana(fkVinicola), 1000)

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            setTimeout(() => alertas_semana(fkVinicola), 1000)

        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function total_critico(fkVinicola) {
    fetch(`/medidas/total_critico/${fkVinicola}`, { cache: 'no-store' }).then(function (response) {
        console.log(response)
        if (response.ok) {

            response.json().then(function (resposta) {
                document.getElementById('b_total_critico').innerHTML = resposta[0].total_critico

                setTimeout(() => total_critico(fkVinicola), 1000)

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            setTimeout(() => total_critico(fkVinicola), 1000)

        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function total_alerta(fkVinicola) {
    fetch(`/medidas/total_alerta/${fkVinicola}`, { cache: 'no-store' }).then(function (response) {
        console.log(response)
        if (response.ok) {

            response.json().then(function (resposta) {
                document.getElementById('b_total_alerta').innerHTML = resposta[0].total_alerta

                setTimeout(() => total_alerta(fkVinicola), 1000)

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            setTimeout(() => total_alerta(fkVinicola), 1000)

        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
window.addEventListener('load', alertas_hoje(fkVinicola))
window.addEventListener('load', alertas_semana(fkVinicola))
window.addEventListener('load', total_critico(fkVinicola))
window.addEventListener('load', total_alerta(fkVinicola))
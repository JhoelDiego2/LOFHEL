let maximo_alerta = 0
let minimo_alerta = 0
function exibeDataHora() {
    // selecionadno a div que exibe a data e a hora na dashboard pelo ID
    const divDataHora = document.getElementById("data-hora");

    // atualizando a hora a cada 1 minuto
    setInterval(() => {
        // pegando a data atual e colocando em uma variável
        const data = new Date();

        // inserindo a data e hora formatadas para o nosso local (pt-BR) na div que selecionei
        divDataHora.innerHTML = `${data.toLocaleDateString("pt-BR"
        )} - ${data.toLocaleTimeString("pt-BR")}`;
    }, 1000);
}
window.addEventListener('load', exibeDataHora)
let proximaAtualizacao


function exibir_armazem(idArmazem) {
    let todosOsGraficos = JSON.parse(sessionStorage.ARMAZENS);

    for (i = 0; i < todosOsGraficos.length; i++) {
        // exibindo - ou não - o gráfico
        let elementoAtual = document.getElementById(`card_topo_${todosOsGraficos[i].idArmazem}`)
        let elementoAtual_container = document.getElementById(`container_${todosOsGraficos[i].idArmazem}`)
        if (elementoAtual.classList.contains("display-flex")) {
            elementoAtual.classList.remove("display-flex")
        }
        elementoAtual.classList.add("display-none")

        if (elementoAtual_container.classList.contains("display-flex")) {
            elementoAtual_container.classList.remove("display-flex")
        }
        elementoAtual_container.classList.add("display-none")
    }

    // exibindo - ou não - o gráfico
    let graficoExibir = document.getElementById(`card_topo_${idArmazem}`)
    graficoExibir.classList.remove("display-none")
    graficoExibir.classList.add("display-flex")

    let graficoExibir_container = document.getElementById(`container_${idArmazem}`)
    graficoExibir_container.classList.remove("display-none")
    graficoExibir_container.classList.add("display-flex")
}
let proximaAtualizacao_kpi
function obterDadosGrafico(fkArmazem) {


    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${fkArmazem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            if (response.statusText == "No Content") {
                Chart.getChart('variacao_temperatura_atual').destroy();
                Chart.getChart('variacao_umidade_atual').destroy();
                Chart.getChart('status_sensores').destroy();
            } else {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    plotarGrafico(resposta.resultado_medidas, resposta.resultado_sensores, fkArmazem);

                });
            }
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {

            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function pegar_parametros(fkArmazem) {

    fetch(`/avisos/pegar_parametros/${fkArmazem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                minimo_alerta = resposta[0].temperaturaMin
                maximo_alerta = resposta[0].temperaturaMax
                minimo_critico = resposta[0].temperaturaMax
                maximo_critico = resposta[0].temperaturaMax
                minimo_ideal = resposta[0].temperaturaMax
                maximo_ideal = resposta[0].temperaturaMax
                document.getElementById('temp_parametro_alerta').innerHTML = `
                    Temperatura: 
                                < ${minimo_alerta} °C ou> ${maximo_alerta} °C
                `
                document.getElementById('temp_parametro_critico').innerHTML = `
                    Temperatura: 
                                < ${minimo_critico} °C ou> ${minimo_critico} °C
                `
                document.getElementById('temp_parametro_ideal').innerHTML = `
                    Temperatura: 
                                < ${minimo_ideal} °C ou> ${maximo_ideal} °C
                `
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function pegar_alertas_especifico(fkArmazem) {
    fetch(`/avisos/pegar_alertas_especifico/${fkArmazem}`, { cache: 'no-store' }).then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function obter_dados_kpi(fkArmazem) {

    if (proximaAtualizacao_kpi != undefined) {
        clearTimeout(proximaAtualizacao_kpi);
    }

    fetch(`/avisos/pegar_valores_kpi/${fkArmazem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log('deu')
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                if (resposta.resultado_hoje[0].min_fora_hoje == null) {
                    document.getElementById('b_tempo_fora').innerHTML = 0
                }
                let totalMinutos = resposta.resultado_hoje[0].min_fora_hoje;

                if (totalMinutos != null) {
                    let horas = Math.floor(totalMinutos / 60);
                    let minutos = Math.floor(totalMinutos % 60);
                    let horario_formatado = `${horas}h ${minutos.toString().padStart(2, '0')}`;
                    document.getElementById('b_tempo_fora').innerHTML = horario_formatado;
                } else {
                    document.getElementById('b_tempo_fora').innerHTML = "0h 00";
                }
                document.getElementById('b_alertas_hoje').innerHTML = `${resposta.resultado_hoje[0].total_alertas_hoje}`
                document.getElementById('b_total_semana').innerHTML = `${resposta.resultado_semana[0].total_alertas_semana}`
            });
            proximaAtualizacao_kpi = setTimeout(() => {
                obter_dados_kpi(fkArmazem)
            }, 1000);
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao_kpi = setTimeout(() => {
                obter_dados_kpi(fkArmazem)
            }, 1000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

let proximaAtualizacao_alerta
let alertas_json = {}
let primeira_vez = true
function apagar_alerta(alerta) {
    var alerta_div = document.getElementById(`mensagem_${alerta}`)
    for (let i = 0; i < alertas_json.length; i++) {
        if (alertas_json[i].valorCapturado == alerta) {
           alerta_div.style.display = "none"
           alertas_json[i].visivel = false
        }
        
    }
}
function obter_alertas(fkArmazem) {

    if (proximaAtualizacao_alerta != undefined) {
        clearTimeout(proximaAtualizacao_alerta);
    }

    fetch(`/avisos/pegar_alertas_especifico/${fkArmazem}`, { cache: 'no-store' }).then(function (response) {
        var alerta = document.getElementById('alerta')
        if (response.ok) {
            if (response.statusText == "No Content") {
                alerta.innerHTML = ''
            }
            response.json().then(function (resposta) {
                console.log('deu')
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                if (alertas_json.length != resposta.length) {
                    alertas_json = resposta
                    for (let i = 0; i < resposta.length; i++) {
                        if (alertas_json[i] != resposta[i]) {
                            alertas_json += resposta[i]
                        }
                    }
                }

                alerta.innerHTML = ''
                if (primeira_vez) {
                    for (let i = 0; i < resposta.length; i++) {
                        alertas_json[i].visivel = true
                        primeira_vez = false
                    }
                }

                for (let i = 0; i < resposta.length; i++) {
                    var ocorrencia = resposta[i]
                    if (alertas_json[i].visivel == true) {
                        alerta.innerHTML += `<div class="mensagem-alarme" id="mensagem_${ocorrencia.valorCapturado}">
                      <div class="informacao">
                                       <div > ${ocorrencia.nomeArmazem} </div>
                                       <h3>${ocorrencia.statusAlerta}!</h3>
                                       <small> ${ocorrencia.statusAlerta} Capturada: ${ocorrencia.valorCapturado}°C.</small>
                                   </div>
                                   <div class="alarme-sino"></div><p onclick= "apagar_alerta(${ocorrencia.valorCapturado})">x</p>
                           </div>`
                    }
                }
                // alerta.innerHTML = ''
                // for (let i = 0; i < resposta.length; i++) {
                //     var ocorrencia = resposta[i]
                //     alertas_visiveis.push(i)
                //     alerta.innerHTML += `
                //             <div class="mensagem-alarme" id="mensagem_${i}">

                //                     <div class="informacao">
                //                         <div > ${ocorrencia.nomeArmazem} </div>
                //                         <h3>${ocorrencia.statusAlerta}!</h3>
                //                         <small> ${ocorrencia.statusAlerta} Capturada: ${ocorrencia.valorCapturado}°C.</small>
                //                     </div>
                //                     <div class="alarme-sino"></div><p onclick= "fechar_alerta(${i})">x</p>
                //             </div>
                //             `
                //     }


            });
            proximaAtualizacao_alerta = setTimeout(() => {
                obter_alertas(fkArmazem)
            }, 1000);
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao_alerta = setTimeout(() => {
                obter_alertas(fkArmazem)
            }, 1000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


let proximaAtualizacao_alerta_todos
function obter_alertas_geral() {
    const notificacao_caixa = document.getElementById('notificacao_caixa')
    if (proximaAtualizacao_alerta_todos != undefined) {
        clearTimeout(proximaAtualizacao_alerta_todos);
    }

    fetch(`/avisos/pegar_alertas_gerais`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log('deu')
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                notificacao_caixa.innerHTML = ''
                for (let i = 0; i < resposta.length; i++) {
                    var ocorrencia = resposta[i]
                    notificacao_caixa.innerHTML += `
                <div class="notificacao">
                        <img src="imagens-deshbord/notifications.png">
                        <p>${ocorrencia.nomeArmazem} <br> <span>${ocorrencia.statusAlerta}</span><br>
                        <span>Inicio: ${ocorrencia.inicioAlerta}</span></p>
                  </div>
                `

                }
            });
            proximaAtualizacao_alerta_todos = setTimeout(() => {
                obter_alertas_geral()
            }, 1000);
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao_alerta_todos = setTimeout(() => {
                obter_alertas_geral()
            }, 1000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGrafico(resultado_medidas, resultado_sensores, fkArmazem) {
    if (Chart.getChart('variacao_temperatura_atual') || resultado_medidas == []) {
        Chart.getChart('variacao_temperatura_atual').destroy();
    }
    if (Chart.getChart('variacao_umidade_atual') || resultado_medidas == []) {
        Chart.getChart('variacao_umidade_atual').destroy();
    }
    if (Chart.getChart('status_sensores') || resultado_sensores == []) {
        Chart.getChart('status_sensores').destroy();
    }
    // Arrays de rótulos e dados
    const label_temperatura = [];
    const data_var_temp = {
        labels: label_temperatura,
        datasets: [{
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: '#551c36',
            backgroundColor: '#551c36',
            tension: 0.4,
            pointBackgroundColor: 'purple',
        },
        {
            label: 'Limite Temp. Max',
            data: [maximo_alerta, maximo_alerta, maximo_alerta, maximo_alerta, maximo_alerta, maximo_alerta, maximo_alerta,],
            borderWidth: 1,
            borderColor: 'rgba(255, 0, 0, 0.77)',
            backgroundColor: 'rgba(255, 0, 0, 0.77)',
            pointRadius: 0
        },
        {
            label: 'Limite Temp. Min',
            data: [minimo_alerta, minimo_alerta, minimo_alerta, minimo_alerta, minimo_alerta, minimo_alerta, minimo_alerta,],
            borderWidth: 1,
            borderColor: 'rgba(255, 0, 0, 0.77)',
            backgroundColor: 'rgba(255, 0, 0, 0.77)',
            pointRadius: 0
        }
        ]
    };

    const labels_umidade = [];
    const data_var_umidade = {
        labels: labels_umidade,
        datasets: [{
            label: 'Umidade',
            data: [],
            fill: true,
            borderColor: 'rgb(158, 73, 99)',
            backgroundColor: 'rgba(168, 44, 81, 0.42)',
            tension: 0.4,
            pointBackgroundColor: 'purple',
        },
        {
            label: 'Limite Umi. Max',
            data: [75, 75, 75, 75, 75, 75, 75,],
            borderWidth: 1,
            borderColor: 'rgba(255, 0, 0, 0.77)',
            backgroundColor: 'rgba(255, 0, 0, 0.77)',
            pointRadius: 0
        },
        {
            label: 'Limite Umi. Min',
            data: [65, 65, 65, 65, 65, 65, 65,],
            borderWidth: 1,
            borderColor: 'rgba(255, 0, 0, 0.77)',
            backgroundColor: 'rgba(255, 0, 0, 0.77)',
            pointRadius: 0
        }
        ]
    };

    // Alimenta os dados de temperatura e umidade
    for (let i = resultado_medidas.length - 1; i >= 0; i--) {
        const registro = resultado_medidas[i];
        label_temperatura.push(registro.dataHora);
        labels_umidade.push(registro.dataHora);

        data_var_temp.datasets[0].data.push(registro.temperatura);
        data_var_umidade.datasets[0].data.push(registro.umidade);

        // Atualiza dados mais recentes na tela
        if (i === 0) {
            const tempAtual = document.getElementById('b_temperatura_atual');
            const umidadeAtual = document.getElementById('b_umidade_atual');
            if (tempAtual) tempAtual.innerHTML = `${registro.temperatura} °C`;
            if (umidadeAtual) umidadeAtual.innerHTML = `${registro.umidade} %`;
        }
    }

    // Configurações dos gráficos de linha
    const config_var_temp = {
        type: 'line',
        data: data_var_temp,
        options: {
            plugins: {
                legend: {
                    position: 'right'
                },
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    color: '#000',
                    font: { weight: 'bold', size: 12 },
                },
                // annotation: {
                //     annotations: {
                //         faixaIdeal: {
                //             type: 'box',
                //             yMin: minimo_alerta,
                //             yMax: maximo_alerta,
                //             backgroundColor: 'rgba(0, 255, 38, 0.1)',
                //             borderColor: 'rgba(0, 255, 38, 0.1)',
                //             borderWidth: 1,
                //             label: {
                //                 content: 'Faixa Ideal',
                //                 enabled: true,
                //                 position: 'start',
                //             },
                //         },
                //         limiteMin: {
                //             type: 'line',
                //             yMin: minimo_alerta,
                //             yMax: minimo_alerta,
                //             borderColor: 'red',
                //             borderWidth: 2,
                //             borderDash: [10, 10],
                //         },
                //         limiteMax: {
                //             type: 'line',
                //             yMin: maximo_alerta,
                //             yMax: maximo_alerta,
                //             borderColor: 'black',
                //             borderWidth: 2,
                //             borderDash: [10, 10],
                //         }
                //     }
                // }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Horário do dia',
                        color: '#000',
                        font: { size: 10, weight: 'bold' },
                    },
                    ticks: { color: '#000', font: { size: 12 } },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                },
                y: {
                    beginAtZero: false,
                    // min: minimo_alerta - 10,
                    // max: maximo_alerta + 10,
                    title: {
                        display: true,
                        text: 'Temperatura (°C)',
                        color: '#000',
                        font: { size: 10, weight: 'bold' },
                    },
                    ticks: { stepSize: 5, color: '#000', font: { size: 12 } },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                },
            },
            interaction: { mode: 'index' }
        }
    };

    const config_var_umidade = {
        type: 'line',
        data: data_var_umidade,
        options: {
            plugins: {
                legend: {
                    position: 'right'
                },
                datalabels: {
                    align: 'top',
                    anchor: 'start',
                    color: '#000',
                    font: { weight: 'bold', size: 12 },
                },
                // annotation: {
                //     annotations: {
                //         faixaIdeal: {
                //             type: 'box',
                //             yMin: 65,
                //             yMax: 75,
                //             backgroundColor: 'rgba(0, 255, 38, 0.1)',
                //             borderColor: 'rgba(0, 255, 38, 0.1)',
                //             borderWidth: 1,
                //             label: {
                //                 content: 'Faixa Ideal',
                //                 enabled: true,
                //                 position: 'start',
                //             },
                //         },
                //         limiteMin: {
                //             type: 'line',
                //             yMin: 65,
                //             yMax: 65,
                //             borderColor: 'red',
                //             borderWidth: 1,
                //             borderDash: [10, 10],

                //         },
                //         limiteMax: {
                //             type: 'line',
                //             yMin: 75,
                //             yMax: 75,
                //             borderColor: 'red',
                //             borderWidth: 2,
                //             borderDash: [10, 10],

                //         }
                //     }
                // }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Horário do dia',
                        color: '#000',
                        font: { size: 10, weight: 'bold' },
                    },
                    ticks: { color: '#000', font: { size: 12 } },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                },
                y: {
                    beginAtZero: true,
                    min: 55,
                    max: 85,
                    title: {
                        display: true,
                        text: 'Umidade (%)',
                        color: '#000',
                        font: { size: 10, weight: 'bold' },
                    },
                    ticks: { stepSize: 5, color: '#000', font: { size: 12 } },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                },
            },
            interaction: { mode: 'index' }
        }
    };
    // Gráfico de status dos sensores (pizza/doughnut)
    const data_status_sensores = {
        labels: ['Ativo', 'Inativo'],
        datasets: [{
            label: 'Status dos Sensores',
            data: [
                resultado_sensores[0].total_sensor_ativo,
                resultado_sensores[0].total_sensor_inativo
            ],
            backgroundColor: ['rgb(158, 73, 99)', 'rgb(189, 115, 137)'],
            radius: '95%',
            hoverOffset: 10
        }]
    };

    const config_sensor = {
        type: 'doughnut',
        data: data_status_sensores,
        options: {
            responsive: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: 'black',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    };

    // Renderização dos gráficos
    const ctx_umidade_atual = document.getElementById('variacao_umidade_atual').getContext('2d');
    if (ctx_umidade_atual) {
        var GraficoUmidade = new Chart(ctx_umidade_atual, config_var_umidade);
    }

    const ctx_temp_atual = document.getElementById('variacao_temperatura_atual').getContext('2d');
    if (ctx_temp_atual) {
        var GraficoTemperatura = new Chart(ctx_temp_atual, config_var_temp);
    }

    const ctx_status_sensor = document.getElementById('status_sensores').getContext('2d');
    if (ctx_status_sensor) {
        var GraficoSensor = new Chart(ctx_status_sensor, config_sensor);
    }
    setTimeout(() => {
        atualizar_grafico_temperatura(fkArmazem, data_var_temp, GraficoTemperatura, data_var_umidade, GraficoUmidade, GraficoSensor, data_status_sensores)
    }, 2000);
}







const armazem_visivel = sessionStorage.ARMAZEM_SELECIONADO;


function exibir_select() {
    const select_arm = document.getElementById('armazem_atual');
    const armazem = JSON.parse(sessionStorage.ARMAZENS || '[]');

    select_arm.innerHTML = '<option value="geral">Geral</option>'; // adiciona 'geral'

    for (let i = 0; i < armazem.length; i++) {
        select_arm.innerHTML += `
            <option value="${armazem[i].idArmazem}">
                ${armazem[i].nomeArmazem}
            </option>
        `;
    }

    // Define o armazém visível no select
    if (armazem_visivel) {
        select_arm.value = armazem_visivel;
    } else {
        select_arm.value = `1`; // ou define algum padrão
    }
}

window.addEventListener('load', function () {
    exibir_select();
    obter_alertas_geral();

    const select = document.getElementById("armazem_atual");
    select.value = armazem_visivel
    // ✅ Carrega o gráfico logo que a página abre, se já houver um selecionado
    const valorSelecionado = select.value;
    if (valorSelecionado !== 'geral') {
        pegar_parametros(valorSelecionado)
        obterDadosGrafico(valorSelecionado);
        pegar_alertas_especifico(valorSelecionado)
        obter_dados_kpi(valorSelecionado)
        obter_alertas(valorSelecionado)
    }

    // 🎯 Listener para mudança no select
    select.addEventListener("change", function () {
        const valorSelecionado = select.value;
        console.log("Selecionado:", valorSelecionado);

        if (valorSelecionado === 'geral') {
            window.location.href = 'deshbord.html';
        } else {
            sessionStorage.ARMAZEM_SELECIONADO = valorSelecionado;
            pegar_parametros(valorSelecionado)
            obterDadosGrafico(valorSelecionado);
            pegar_alertas_especifico(valorSelecionado)
            obter_dados_kpi(valorSelecionado)
            obter_alertas(valorSelecionado)

        }
    });
});


function atualizar_grafico_temperatura(fkArmazem, data_var_temp, GraficoTemperatura, data_var_umidade, GraficoUmidade) {



    fetch(`/medidas/tempo-real/${fkArmazem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                //  obterdados(fkArmazem);
                // alertar(novoRegistro, fkArmazem);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(data_var_temp);


                if (novoRegistro[0].dataHora == data_var_temp.labels[data_var_temp.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há data_var_temp novos para captura, o gráfico não atualizará.")
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].dataHora)
                    console.log("Horário do último dado capturado:")
                    console.log(data_var_temp.labels[data_var_temp.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    data_var_temp.labels.shift(); // apagar o primeiro
                    data_var_temp.labels.push(novoRegistro[0].dataHora); // incluir um novo momento

                    data_var_temp.datasets[0].data.shift();  // apagar o primeiro de temperatura
                    data_var_temp.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura
                    b_temperatura_atual.innerHTML = `${novoRegistro[0].temperatura} °C`
                    GraficoTemperatura.update();

                    data_var_umidade.labels.shift(); // apagar o primeiro
                    data_var_umidade.labels.push(novoRegistro[0].dataHora); // incluir um novo momento

                    data_var_umidade.datasets[0].data.shift();  // apagar o primeiro de temperatura
                    data_var_umidade.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de temperatura
                    b_umidade_atual.innerHTML = `${novoRegistro[0].umidade} %`

                    GraficoUmidade.update();


                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizar_grafico_temperatura(fkArmazem, data_var_temp, GraficoTemperatura, data_var_umidade, GraficoUmidade), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizar_grafico_temperatura(fkArmazem, data_var_temp, GraficoTemperatura, data_var_umidade, GraficoUmidade), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

var notificacao_aberta = false
// abrir as notificaoes
function abrir_notificacoes() {
    if (notificacao_aberta == false) {
        notificacao_caixa.style = "display: 1 "
        notificacao_aberta = true
    } else {
        notificacao_caixa.style = "display: none "
        notificacao_aberta = false

    }


}
function fechar_notificacoes() {
    notificacao_caixa.style = "display:none"
}
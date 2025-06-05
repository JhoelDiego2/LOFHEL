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
function exibirArmazemDoUsuarFDFSAFFDSAFDSADSAFDSAio() {
    var armazem = JSON.parse(sessionStorage.ARMAZEM);

    aquarios.forEach(item => {
        document.getElementById("btnAquario").innerHTML += `
            <button class="btn-chart" onclick="exibirAquario(${item.id})" id="btnAquario${item.id}">${item.descricao}</button>
            `

        document.getElementById("graficos").innerHTML += `
                <div id="grafico${item.id}" class="display-none">
                    <h3 class="tituloGraficos">
                        <span id="tituloAquario${item.id}">${item.descricao}</span>
                    </h3>
                    <div class="graph">
                        <canvas id="myChartCanvas${item.id}"></canvas>
                    </div>
                    <div class="label-captura">
                        <p id="avisoCaptura${item.id}" style="color: white"></p>
                    </div>
                </div>
            `

        obterDadosGrafico(item.id)
    });

    if (aquarios.length > 0) {
        exibirAquario(aquarios[0].id)
    }
}



function exibirArmazemDoUsuario() {


    var armazem = JSON.parse(sessionStorage.ARMAZENS);
    var main_container = document.querySelector(".main");
    var armazem_visivel = sessionStorage.ARMAZEM_SELECIONADO

    console.log(armazem)


    for (let i = 0; i < armazem.length; i++) {
        var ocorrencia = armazem[i]

        main_container.innerHTML += ` <div class="card-topo" id="card_topo_${ocorrencia.idArmazem}">
    <div class="card pouco_texto">
        <p class="titulo_card">Temperatura Atual</p>
        <p class="texto_card" id="b_temperatura_atual">2°C</p>
    </div>
    <div class="card pouco_texto">
        <p class="titulo_card">Umidade Atual</p>
        <p class="texto_card" id="b_umidade_atual">50%</p>
    </div>
    <div class="card pouco_texto">
        <p class="titulo_card">Alertas hoje</p>
        <p class="texto_card">1</p>
    </div>
    <div class="card">
        <p class="titulo_card">Alerta mais frequente</p>
        <p class="texto_card">Critico</p>
    </div>
    <div class="card">
        <p class="titulo_card">Total de alertas na semana</p>
        <p class="texto_card">3</p>
    </div>
</div>
<div class="container" id="container_${ocorrencia.idArmazem}">

            <div class="column-1">
                <div class="grafico donut">
                    <h4 class="titulo_card titulo_desh">Distribuição de Status dos Sensores (%)</h4>
                    <canvas id="status_sensores_${ocorrencia.idArmazem}" style="width: 20vw; height: 22vh;"> </canvas>
                </div>
                <div class="container-notification-history" id="parametros_${ocorrencia.idArmazem}">
                    <div class="info-history">
                        <p style="text-align: center; width: 100%;">Legenda Parametros</p>
                    </div>
                    <div class="container-history">
                        <div class="history">
                            <img src="imagens-deshbord/alert-critico.png" alt="">
                            <div class="data-history">
                                <p class="titulo_params">Alerta Crítico</p>
                                <p> Temperatura:
                                    < 10 °C ou> 20 °C
                                </p>
                                <p> Umidade:
                                    < 55% ou> 75%
                                </p>
                            </div>
                        </div>

                        <div class="history">
                            <img src="https://cdn-icons-png.flaticon.com/512/257/257195.png" alt="">
                            <div class="data-history">
                                <p class="titulo_params">Atenção</p>
                                <p>Temperatura: 
                                < 11.5 °C ou> 16.5 °C</p>
                                <p> Umidade:
                                < 58% ou> 72%</p>
                            </div>
                        </div>

                        <div class="history">
                            <img src="https://img.freepik.com/vetores-premium/icone-de-avisos-de-notificacao_1076610-18996.jpg?semt=ais_hybrid&w=740"
                                alt="">
                            <div class="data-history">
                                <p class="titulo_params">Cuidado</p>
                                <p>Temperatura: 
                                < 10 °C ou> 20 °C</p>
                                <p> Umidade:
                                < 55% ou> 75%</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div class="column-2">
                <div class="grafico linha" style="height: 36vh">
                    <h4 class="titulo_card titulo_desh">Variação na Temperatura nas Últimas 24h</h4>
                    <canvas id="variacao_temperatura_atual_${ocorrencia.idArmazem}" style="width: 24vw; height: 12vh;"></canvas>
                </div>
                <div class="grafico linha" style="height: 36vh">
                    <h4 class="titulo_card titulo_desh">Variação na Umidade nas Últimas 24h</h4>
                    <canvas id="variacao_umidade_atual_${ocorrencia.idArmazem}" style="width: 24vw; height: 12vh;"></canvas>
                </div>
            </div>
        </div>

    </div> `

        obterDadosGrafico(ocorrencia.idArmazem)
    }


    if (armazem.length > 0) {
        exibir_armazem(armazem_visivel)
    }
}
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
function obterDadosGrafico(fkArmazem) {


    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${fkArmazem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);


                plotarGrafico(resposta, fkArmazem);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}



function plotarGrafico(resposta, fkArmazem) {

    const label_temperatura = []
    const data_var_temp = {
        labels: label_temperatura,
        datasets: [{
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: '#551c36',
            backgroundColor: '#551c36',
            tension: 0.1
        },
        ]
    };

    for (let i = resposta.length - 1; i >= 0; i--) {
        var registro = resposta[i];
        label_temperatura.push(registro.dataHora);
        data_var_temp.datasets[0].data.push(registro.temperatura);
        if (i == 0) {
            b_temperatura_atual.innerHTML = `${registro.temperatura} ° C`
        }
    }
    const config_var_temp = {
        type: 'line',
        data: data_var_temp,
    };
    const ctx_temp_atual = document.getElementById(`variacao_temperatura_atual_${fkArmazem}`).getContext('2d');
    let GraficoTemperatura = new Chart(ctx_temp_atual, config_var_temp);

    const labels_umidade = []
    const data_var_umidade = {
        labels: labels_umidade,
        datasets: [{
            label: 'Umidade',
            data: [],
            fill: true,
            borderColor: 'rgba(240, 248, 255, 0)',
            backgroundColor: 'rgb(158, 73, 99',
            tension: 0.1
        },
        ]
    };
    for (let i = resposta.length - 1; i >= 0; i--) {
        var registro = resposta[i];
        labels_umidade.push(registro.dataHora);
        data_var_umidade.datasets[0].data.push(registro.umidade);
        if (i == 0) {
            b_umidade_atual.innerHTML = `${registro.umidade} %`
        }
    }
    const config_var_umidade = {
        type: 'line',
        data: data_var_umidade,
    };

    const ctx_umidade_atual = document.getElementById(`variacao_umidade_atual_${fkArmazem}`).getContext('2d');
    let GraficoUmidade = new Chart(ctx_umidade_atual, config_var_umidade);




    // setTimeout(() => {
    //     atualizar_grafico_temperatura(fkArmazem, data_var_temp, GraficoTemperatura, data_var_umidade, GraficoUmidade)
    // }, 2000);

}








function exibir_select() {
    const select_arm = document.getElementById('armazem_atual');
    const armazem = JSON.parse(sessionStorage.ARMAZENS || '[]');
    const armazem_visivel = sessionStorage.ARMAZEM_SELECIONADO;

    select_arm.innerHTML = ''; // limpa antes

    for (let i = 0; i < armazem.length; i++) {
        select_arm.innerHTML += `
            <option value="${armazem[i].idArmazem}">
                ${armazem[i].nomeArmazem}
            </option>
        `;
    }

    select_arm.value = armazem_visivel;
}

window.addEventListener('load', function () {
    exibir_select();
    exibirArmazemDoUsuario()

    const select = document.getElementById("armazem_atual");

    select.addEventListener("change", function () {
        const valorSelecionado = select.value;
        console.log("Selecionado:", valorSelecionado);

        if (valorSelecionado === 'geral') {
            window.location.href = 'deshbord.html';
        } else {
            if (valorSelecionado != sessionStorage.ARMAZEM_SELECIONADO) {
                sessionStorage.ARMAZEM_SELECIONADO = valorSelecionado;
                exibir_armazem(valorSelecionado);
            }
        }
    });
});
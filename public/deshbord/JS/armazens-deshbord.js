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
                select_arm.innerHTML += '<option value="geral">Geral</option>'


                for (let i = 0; i < resposta.length; i++) {
                    select_arm.innerHTML += `
                        <option value="${resposta[i].idArmazem}">${resposta[i].nomeArmazem}</option>
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

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
window.addEventListener('load', obterArmazens)

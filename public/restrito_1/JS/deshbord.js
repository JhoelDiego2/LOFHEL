function fechar_alerta() {
    alerta_grupo3.style = "display:none"
    div_sair_alerta.style = "display:none"

}
/*COMECO DE VERIFICAÇÕES DA ABA CADASTRO DE FUNCIONARIOS--------------------------------------------------------------------------------------------------------------------**/
// function digitando() {
//     ipt_nome.value != '' ? (texto_nome.style = "color:black", ipt_nome.style = " border-bottom-color: #0B0B0B") : null
//     ipt_email.value != '' ? (texto_email.style = "color:black", ipt_email.style = " border-bottom-color: #0B0B0B") : null
//     ipt_telefone.value != '' ? (texto_telefone.style = "color:black", ipt_telefone.style = " border-bottom-color: #0B0B0B") : null
//     ipt_cargo.value != '' ? (texto_cargo.style = "color:black", ipt_cargo.style = " border-bottom-color: #0B0B0B") : null
//     ipt_senha.value != '' ? (texto_senha.style = "color:black", ipt_senha.style = " border-bottom-color: #0B0B0B") : null
//     ipt_email_atualizar.value != '' ? (texto_email_atualizar.style = "color:black", ipt_email_atualizar.style = " border-bottom-color: #0B0B0B") : null
//     ipt_telefone_atualizar.value != '' ? (texto_telefone_atualizar.style = "color:black", ipt_telefone_atualizar.style = " border-bottom-color: #0B0B0B") : null
//     ipt_cargo_atualizar.value != '' ? (texto_cargo_atualizar.style = "color:black", ipt_cargo_atualizar.style = " border-bottom-color: #0B0B0B") : null
//     ipt_email_remover.value != '' ? (texto_email_remover.style = "color:black", ipt_email_remover.style = " border-bottom-color: #0B0B0B") : null
//     ipt_cargo_remove.value != '' ? (texto_cargo_remove.style = "color:black", ipt_cargo_remove.style = " border-bottom-color: #0B0B0B") : null
// }
function cadastrar_funcionario() {
    var nome = ipt_nome.value;
    var email = ipt_email.value;
    var telefone = ipt_telefone.value;
    var cargo = ipt_cargo.value;
    var senha = ipt_senha.value;
    var valido = false;
    var email_largura = email.length
    var i_arroba = 0
    //validar email
    if (email == '' || cargo == '' || telefone == '' || senha == '') {
        cadastrar_vazio.style = "display:1; color:red;"
    }
    // verificar se tem mais de um @ 
    for (let i = 0; i < email.length; i++) {
        if (email[i] == '@') i_arroba++
    }

    if ((email.includes('@') && (i_arroba == 1)) && (email.includes('.')) && email_largura >= 7) {
        valido = true
    } else {
        erro_email.style = "display:1; color:red"
        vaido = false
    }
    if (telefone.length == 11) {
        valido = true
    } else {
        erro_telefone.style = "display:1; color:red"
        vaido = false
    }
    if (valido == true) {

        fetch("/usuarios/cadastrar_funcionario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeFuncionarioServer: nome,
                emailServer: email,
                telefoneServer: telefone,
                cargoServer: cargo,
                senhaServer: senha
            }),
        })
            .then(function (resultado_cargo) {
                console.log("resultado_cargo: ", resultado_cargo);

                if (resultado_cargo.ok) {
                    var fkVinicola = sessionStorage.ID_VINICOLA
                    exibir_select(fkVinicola)
                    alert('deu')
                    alerta_grupo3.style = "display:1"
                    div_sair_alerta.style = "display:1"
                    erro_telefone.style = "display:none"
                    erro_email.style = "display:none"
                    ipt_nome.value = ''
                    ipt_email.value = ''
                    ipt_telefone.value = ''
                    ipt_cargo.value = ''
                    ipt_senha.value = ''

                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resultado_cargo) {
                console.log(`#ERRO: ${resultado_cargo}`);
            });

        return false;
    }
}
function atualizar_funcionario() {
    var email_atualizar = ipt_email_atualizar.value;
    var telefone_atualizar = ipt_telefone_atualizar.value;
    var cargo_atualizar = ipt_cargo_atualizar.value;
    var valido = false;
    var email_atualizar_largura = email_atualizar.length
    var i_arroba = 0
    if (email_atualizar == '' || cargo_atualizar == '' || telefone_atualizar == '') {
        atualizar_vazio.style = "display:1; color:red;"
    }
    //validar email_atualizar
    // verificar se tem mais de um @ 
    for (let i = 0; i < email_atualizar.length; i++) {
        i_arroba++

    }
    if ((email_atualizar.includes('@') && (i_arroba == 1)) && (email_atualizar.includes('.')) && email_atualizar_largura >= 7) {
        valido = true
    } else {
        erro_email_atualizar.style = "display:1; color:red"
        vaido = false
    }
    if (telefone_atualizar.length == 11) {
        valido = true
    } else {
        erro_telefone_atualizar.style = "display:1; color:red"
        vaido = false
    }
    if (valido == true) {
        alerta_grupo3.style = "display:1"
        div_sair_alerta.style = "display:1"
        erro_telefone_atualizar.style = "display:none"
        erro_email_atualizar.style = "display:none"
        ipt_email_atualizar.value = ''
        ipt_telefone_atualizar.value = ''
        ipt_cargo_atualizar.value = ''
    }

}
function remover_funcionario() {
    var email_remover = ipt_email_remover.value;
    var valido = true;
    var email_remover_largura = email_remover.length
    var i_arroba = 0
    var senha = ipt_Deletarsenha.value
    var confirmarSenha = ipt_DeletarConfirmarsenha
    var idFuncionario = sessionStorage.ID_USUARIO
    if (email_remover == '') {
        remover_vazio.style = "display:1; color:red;"
    }
    //validar email_remover

    // verificar se tem mais de um @ 
    for (let i = 0; i < email_remover.length; i++) {
        i_arroba++
    }
    // // if ((email_remover.includes('@') && (i_arroba == 1)) && (email_remover.includes('.')) && email_remover_largura >= 7) {
    // //     valido = true
    // // } else {
    // //     erro_email_remover.style = "display:1; color:red"
    // //     vaido = false
    // }
    if (valido == true) {


        fetch("/usuarios/deletar_funcionario", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailServer: email_remover,
                senhaServer: senha,
                idFuncionarioServer: idFuncionario
            }),
        })
            .then(function (resultado_cargo) {
                console.log("resultado_cargo: ", resultado_cargo);

                if (resultado_cargo.ok) {
                    var fkVinicola = sessionStorage.ID_VINICOLA
                    exibir_select(fkVinicola)
                    alert('Funcionario deletado com sucesso')
                    alerta_grupo3.style = "display:1"
                    div_sair_alerta.style = "display:1"
                    erro_telefone.style = "display:none"
                    erro_email.style = "display:none"
                    ipt_email.value = ''
                    ipt_senha.value = ''

                } else {
                    throw "Houve um erro ao tentar realizar a deleção do funcionario!";
                }
            })
            .catch(function (resultado_cargo) {
                console.log(`#ERRO: ${resultado_cargo}`);
            });

        return false;
    }

}
/*FIM DE VERIFICAÇÕES DA ABA CADASTRO DE FUNCIONARIOS--------------------------------------------------------------------------------------------------------------------**/
/*COMECO VERIFICAÇÕES DSA ABA CADASTRO DE ARMAZEMS-------------------------------------------------------------------------------------------------------------------------------- */

// function digitando() {
//     var select = select_grupo.value
//     //var temperatura = ipt_temp_ideal.value
//     // var umidade = ipt_umidade_ideal.value
//     ipt_nome.value != '' ? (texto_nome.style = "color:black", ipt_nome.style = " border-bottom-color: #0B0B0B") : null
//     //ipt_temp_ideal.value != '' ? (texto_temp_ideal.style = "color:black", ipt_temp_ideal.style = " border-bottom-color: #0B0B0B") : null
//     // ipt_umidade_ideal.value != '' ? (texto_umidade_ideal.style = "color:black", ipt_umidade_ideal.style = " border-bottom-color: #0B0B0B") : null
//     ipt_armazem_remover.value != '' ? (texto_armazem_remover.style = "color:black", ipt_armazem_remover.style = " border-bottom-color: #0B0B0B") : null
//     ipt_senha_remover.value != '' ? (texto_senha_remover.style = "color:black", ipt_senha_remover.style = " border-bottom-color: #0B0B0B") : null
//     ipt_confirmacao_remover.value != '' ? (texto_confirmacao_remover.style = "color:black", ipt_confirmacao_remover.style = " border-bottom-color: #0B0B0B") : null
//     if (select != '') {
//         texto_select.style = "color:black"
//         select_grupo.style = " border-bottom-color: #0B0B0B"
//         // ipt_umidade_ideal.value = "55"
//         // ipt_umidade_ideal.placeholder = "55 (sugestão)"
//         // texto_umidade_ideal.style = "color: black"
//         //ipt_umidade_ideal.style = " border-bottom-color: #0B0B0B"
//         //texto_temp_ideal.style = "color: black"
//         // ipt_temp_ideal.style = " border-bottom-color: #0B0B0B"
//     }
//     /* if (temperatura != '') {
//          texto_temp_ideal.style = "color: black"
//          ipt_temp_ideal.style = " border-bottom-color: #0B0B0B"
//      }
//      if (umidade != '') {
//          texto_umidade_ideal.style = "color: black"
//          ipt_umidade_ideal.style = " border-bottom-color: #0B0B0B"
//      }*/

// }
function cadastrar_armazem() {
    var select = select_grupo.value
    // var temperatura = ipt_temp_ideal.value
    //  var umidade = ipt_umidade_ideal.value
    var nome_armazem = ipt_nome.value
    var fkVinicola = sessionStorage.ID_VINICOLA



    if (select == '' || nome_armazem == '') {
        cad_armazem_vazio.style = "display=1"
    }
    else {
        fetch("/armazem/cadastroArmazem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({

                selecionarServer: select,
                armazemNomeServer: nome_armazem,
                fkVinicolaServer: fkVinicola
            }),
        })
            .then(function (resultado_representante) {
                console.log("resultado_representante: ", resultado_representante);

                if (resultado_representante.ok) {


                    alert('Cadastro de armazém realizado com sucesso!')

                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resultado_representante) {
                console.log(`#ERRO: ${resultado_representante}`);
            });

        return false;
    }
}

function remover_armazem() {
    var armazem_remover = ipt_armazem_remover.value
    var remover_arm_senha = ipt_senha_remover.value
    var remover_arm_confirmacao = ipt_confirmacao_remover.value
    var idFuncionario = sessionStorage.ID_USUARIO
    if (remover_arm_senha != remover_arm_confirmacao) {
        alert('Senhas não coincidem')
    } else
        if (armazem_remover == '' || remover_arm_senha == '' || remover_arm_confirmacao == '') {
            remover_armazem_vazio.style = "display:1"
        } else {
            fetch("/armazem/removerArmazem", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    fkArmazemServer: armazem_remover,
                    senha: remover_arm_senha, 
                    idFuncionario:idFuncionario
                }),
            })
                .then(function (resultado_representante) {
                    console.log("resultado_representante: ", resultado_representante);

                    if (resultado_representante.ok) {


                        alert('Remoção de armazém realizado com sucesso!')

                    } else {
                        throw "Houve um erro ao tentar realizar o cadastro!";
                    }
                })
                .catch(function (resultado_representante) {
                    console.log(`#ERRO: ${resultado_representante}`);
                });

            return false;
        }
}


/*FIM VERIFICAÇÕES DSA ABA CADASTRO DE ARMAZEMS-------------------------------------------------------------------------------------------------------------------------------- */

function mudar(nome) {
    document.getElementById('tit_funcionario').style.fontWeight = "100"
    document.getElementById('tit_cargos').style.fontWeight = "100"
    document.getElementById(`tit_${nome}`).style.fontWeight = "800"
    document.getElementById('section_cargos').style.display = 'none'
    document.getElementById('section_funcionario').style.display = 'none'
    document.getElementById(`section_${nome}`).style.display = 'flex'
}

function cadastrar_cargo() {
    var permissoes = []
    var nome = ipt_nome_cargo.value
    var dash = ck_dash.value
    var armazem = ck_armazem.value
    var funcionarios = ck_funcionarios.value
    var relatorios = ck_relatorios.value
    var fkVinicola = sessionStorage.ID_VINICOLA
    if (ck_dash.checked) {
        permissoes.push(dash)
    }
    if (ck_armazem.checked) {
        permissoes.push(armazem)
    }
    if (ck_funcionarios.checked) {
        permissoes.push(funcionarios)
    }
    if (ck_relatorios.checked) {
        permissoes.push(relatorios)
    }
    if (permissoes == [] || nome == '') {
        cad_armazem_vazio.style = "display=1"
    }
    else {
        fetch("/empresas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeArmazemServer: nome,
                permissoesServer: permissoes,
                fkVinicolaServer: fkVinicola,
            }),
        })
            .then(function (resultado_cargo) {
                console.log("resultado_cargo: ", resultado_cargo);

                if (resultado_cargo.ok) {
                    var fkVinicola = sessionStorage.ID_VINICOLA
                    exibir_select(fkVinicola)
                    alert('Cargo cadastrado com sucesso')

                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resultado_cargo) {
                console.log(`#ERRO: ${resultado_cargo}`);
            });

        return false;
    }
}
function exibir_select(fkVinicola) {
    var select1 = document.getElementById('ipt_cargo_atualizar')
    var select2 = document.getElementById('ipt_cargo')
    var select3 = document.getElementById('ipt_cargo_atualizar_cargo')
    var select4 = document.getElementById('ipt_cargo_remover_cargo')
    var cargos = ''
    fetch(`/empresas/pegar_cargos/${fkVinicola}`, { cache: 'no-store' }).then(function (response) {
        console.log(response)
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                select1.innerHTML = '<option value="">Selecionar Cargo</option>'
                select2.innerHTML = '<option value="">Selecionar Cargo</option>'
                select3.innerHTML = '<option value="">Selecionar Cargo</option>'
                select4.innerHTML = '<option value="">Selecionar Cargo</option>'
                for (let i = 0; i < resposta.length; i++) {
                    cargos += `
                        <option value="${resposta[i].idCargo}">
                            ${resposta[i].nomeCargo}
                        </option>
                    `;
                }
                console.log(select1)
                console.log(select2)
                select1.innerHTML += cargos
                select2.innerHTML += cargos
                select3.innerHTML += cargos
                select4.innerHTML += cargos
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
window.addEventListener('load', exibir_select(fkVinicola))

function atualizar_cargo() {
    var permissoes = []
    var nome = ipt_nome_cargo_atualizar.value
    var dash = ck_dash2.value
    var armazem = ck_armazem2.value
    var funcionarios = ck_funcionarios2.value
    var relatorios = ck_relatorios2.value
    var select = ipt_cargo_atualizar_cargo.value
    if (ck_dash2.checked) {
        permissoes.push(dash)
    }
    if (ck_armazem2.checked) {
        permissoes.push(armazem)
    }
    if (ck_funcionarios2.checked) {
        permissoes.push(funcionarios)
    }
    if (ck_relatorios2.checked) {
        permissoes.push(relatorios)
    }
    if (permissoes == [] || nome == '' || select == '') {
        cad_armazem_vazio.style = "display=1"
    }
    else {
        fetch("/empresas/atualizar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeArmazemServer: select,
                permissoesServer: permissoes,
                nomeNovoServer: nome,
            }),
        })
            .then(function (resultado_cargo) {
                console.log("resultado_cargo: ", resultado_cargo);

                if (resultado_cargo.ok) {
                    var fkVinicola = sessionStorage.ID_VINICOLA
                    exibir_select(fkVinicola)
                    alert('deu')

                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resultado_cargo) {
                console.log(`#ERRO: ${resultado_cargo}`);
            });

        return false;
    }
}

function remover_cargo() {
    var idFuncionario = sessionStorage.ID_USUARIO
    var select = ipt_cargo_remover_cargo.value
    var senha = ipt_senha_arm.value
    var conf_senha = ipt_conf_arm.value



    if (senha == '' || select == '') {
        cad_armazem_vazio.style = "display=1"
    } else if (senha != conf_senha) {
        cad_armazem_vazio.style = "display=1"
    } else {
        fetch("/empresas/deletar", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idFuncionarioServer: idFuncionario,
                idCargoServer: select,
                senhaServer: senha,
            }),
        })
            .then(function (resultado_cargo) {
                console.log("resultado_cargo: ", resultado_cargo);

                if (resultado_cargo.ok) {
                    var fkVinicola = sessionStorage.ID_VINICOLA
                    exibir_select(fkVinicola)
                    alert('Cargo removido com sucesso')

                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resultado_cargo) {
                console.log(`#ERRO: ${resultado_cargo}`);
            });

        return false;
    }
}
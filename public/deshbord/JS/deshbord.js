function fechar_alerta() {
    alerta_grupo3.style = "display:none"
    div_sair_alerta.style = "display:none"
    
}
/*COMECO DE VERIFICAÇÕES DA ABA CADASTRO DE FUNCIONARIOS--------------------------------------------------------------------------------------------------------------------**/
function digitando() {
    ipt_nome.value != '' ? (texto_nome.style = "color:black", ipt_nome.style = " border-bottom-color: #0B0B0B") : null
    ipt_email.value != '' ? (texto_email.style = "color:black", ipt_email.style = " border-bottom-color: #0B0B0B") : null
    ipt_telefone.value != '' ? (texto_telefone.style = "color:black", ipt_telefone.style = " border-bottom-color: #0B0B0B") : null
    ipt_cargo.value != '' ? (texto_cargo.style = "color:black", ipt_cargo.style = " border-bottom-color: #0B0B0B") : null
    ipt_senha.value != '' ? (texto_senha.style = "color:black", ipt_senha.style = " border-bottom-color: #0B0B0B") : null
    ipt_email_atualizar.value != '' ? (texto_email_atualizar.style = "color:black", ipt_email_atualizar.style = " border-bottom-color: #0B0B0B") : null
    ipt_telefone_atualizar.value != '' ? (texto_telefone_atualizar.style = "color:black", ipt_telefone_atualizar.style = " border-bottom-color: #0B0B0B") : null
    ipt_cargo_atualizar.value != '' ? (texto_cargo_atualizar.style = "color:black", ipt_cargo_atualizar.style = " border-bottom-color: #0B0B0B") : null
    ipt_email_remover.value != '' ? (texto_email_remover.style = "color:black", ipt_email_remover.style = " border-bottom-color: #0B0B0B") : null
    ipt_cargo_remove.value != '' ? (texto_cargo_remove.style = "color:black", ipt_cargo_remove.style = " border-bottom-color: #0B0B0B") : null
}
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
        i_arroba++

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
        alerta_grupo3.style = "display:1"
        div_sair_alerta.style = "display:1"
        erro_telefone.style = "display:none"
        erro_email.style = "display:none"
        ipt_nome.value = ''
        ipt_email.value = ''
        ipt_telefone.value = ''
        ipt_cargo.value = ''
        ipt_senha.value = ''
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
    var cargo_remover = ipt_cargo_remover.value;
    var valido = false;
    var email_remover_largura = email_remover.length
    var i_arroba = 0
    if (email_remover == '' || cargo_remover == '') {
        remover_vazio.style = "display:1; color:red;"
    }
    //validar email_remover

    // verificar se tem mais de um @ 
    for (let i = 0; i < email_remover.length; i++) {
        i_arroba++
    }
    if ((email_remover.includes('@') && (i_arroba == 1)) && (email_remover.includes('.')) && email_remover_largura >= 7) {
        valido = true
    } else {
        erro_email_remover.style = "display:1; color:red"
        vaido = false
    }
    if (valido == true) {
        alerta_grupo3.style = "display:1"
        div_sair_alerta.style = "display:1"
        erro_email_remover.style = "display:none"
        ipt_email_remover.value = ''
        ipt_telefone_atualizar.value = ''
        ipt_cargo_remover.value = ''
    }

}
/*FIM DE VERIFICAÇÕES DA ABA CADASTRO DE FUNCIONARIOS--------------------------------------------------------------------------------------------------------------------**/

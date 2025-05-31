// sessão
var fkUsuario = sessionStorage.ID_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var email = sessionStorage.EMAIL_USUARIO;
    var telefone = sessionStorage.TELEFONE_USUARIO;
    var fkVinicola = sessionStorage.ID_VINICOLA;
    var nomeFantasia = sessionStorage.NOME_FANTASIA_VINICOLA;
    var fkCargo = sessionStorage.ID_CARGO_USUARIO;
    var nomeCargo = sessionStorage.NOME_CARGO_USUARIO;
    var fkPermissao = sessionStorage.PERMISSOES_USUARIO;
function validarSessao() {
    var b_usuario = document.querySelectorAll(".b_usuario");
    var b_nome_fantasia = document.getElementById("b_nome_fantasia");
    var b_cargo = document.getElementById("b_cargo");
    
    if ( nome != null || nomeFantasia != null || nomeCargo != null || fkUsuario != null ||
        email != null  || telefone != null || fkVinicola != null || fkCargo != null || nomeCargo != null ||
        fkPermissao != null 
    ) {
        console.log('fdsafsdafafda')
        b_usuario[0].innerHTML = nome;
        b_usuario[1].innerHTML = nome;
        b_nome_fantasia.innerHTML = nomeFantasia;
        b_cargo.innerHTML = nomeCargo;

    } else {
        alert("redicionamento")
       // window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}


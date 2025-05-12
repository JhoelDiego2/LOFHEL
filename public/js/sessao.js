// sessão
function validarSessao() {
    var nome = sessionStorage.NOME_USUARIO;
    var nomeFantasia = sessionStorage.NOME_FANTASIA_VINICOLA 
    var nomeCargo = sessionStorage.NOME_CARGO_USUARIO 
    var b_usuario = document.querySelectorAll(".b_usuario");
    var b_nome_fantasia = document.getElementById("b_nome_fantasia");
    var b_cargo = document.getElementById("b_cargo");
 
    if ( nome != null || nomeFantasia != null || nomeCargo != null) {
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


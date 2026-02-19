function fnLimparCampos() {
    document.getElementById("form-login").reset()
}

function fnFazerLogin() {
    let formDados = {
        usuario: document.getElementById("usuario").value,
        senha: document.getElementById("senha").value
    }
    fetch('http://localhost:3000/login/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formDados)
    })
    .then(resposta => resposta.status())
    .then((dados) => {
        fnLimparCampos()
        if (dados === 200) {
        console.log("acesso a pagina ADMIN")
        }else if (dados === 401) {
        console.log("Usuário ou senha inválidos")
        }else{
            console.log("Algum erro aconteceu, tente novamente mais tarde")
}
        })
    .catch(erro => console.log(erro.message))
}

let btn_login = document.getElementById("btn-login")
btn_login.addEventListener("click", function () {
    console.log("oi")
    fnFazerLogin()
})
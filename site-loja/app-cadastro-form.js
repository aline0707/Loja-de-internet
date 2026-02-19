
function fnLimparCampos() {
    document.getElementById("form-cad-usuario").reset()
}

function fnCadastrarUsuario() {

    let formDados = {
        usuario: document.getElementById("usuario").value,
        senha: document.getElementById("senha").value,
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        permissao: document.getElementById("permissao").value

    }
    console.dir(formDados)

    fetch('http://localhost:3000/usuario/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDados)
    })
        .then(reposta => reposta.json())
        .then((dados) => {
            console.log(dados);
            fnLimparCampos()
        })
        .catch(erro =>
            console.log(erro.message))
}


// let foto = document.getElementById("foto")
let btn_salvar = document.getElementById("btn-salvar-usuario")


// foto.addEventListener("blur", function () {
//     fnAlterarFoto()
// })

btn_salvar.addEventListener("click", function () {
    fnCadastrarUsuario()
})



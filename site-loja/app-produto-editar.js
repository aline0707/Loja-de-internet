function fnAlterarFoto() {
    if (foto.value != '') {
        document.getElementById("fundo-imagem").style.backgroundImage = `url('${foto.value}')`
    } else {
        document.getElementById("fundo-imagem").style.backgroundImage = `url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%27)`
    }
    console.log(foto.value)
}
 
function fnLimparCampos() {
    document.getElementById("form-produtos").reset()
}
 
function fnSalvarProdutos() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id') + "/"
 
    let formDados = {
        titulo: document.getElementById("titulo").value,
        preco: document.getElementById("preco").value,
        descricao: document.getElementById("descricao").value,
        avaliacao: document.getElementById("avaliacao").value,
        foto: document.getElementById("foto").value,
        categoria: document.getElementById("categoria").value
    }
 
    console.dir(formDados)
 
    fetch('http://localhost:3000/produto/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDados)
    })
        .then(resposta => resposta.json())
        .then((dados) => {
            fnMensagemSalvar()
        })
        .catch(erro => console.log(erro.message))
}
 
function fnCarregarDados() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get('id') + "/"
 
    let formDados = {
        titulo: document.getElementById("titulo").value,
        preco: document.getElementById("preco").value,
        descricao: document.getElementById("descricao").value,
        avaliacao: document.getElementById("avaliacao").value,
        foto: document.getElementById("foto").value,
        categoria: document.getElementById("categoria").value
    }
    console.dir(formDados)
 
    fetch('http://localhost:3000/produto/' + id, { method: 'GET' })
        .then(resposta => resposta.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarProduto(produto)
            })
        })
        .catch(erro => console.log(erro.message))
}
 
function fnMontarProduto(produto) {
    document.getElementById("fundo-imagem").style.backgroundImage = `url(${produto.foto})`
    document.getElementById("foto").value = produto.foto
    document.getElementById("titulo").value = produto.titulo
    document.getElementById("descricao").value = produto.descricao
    document.getElementById("categoria").value = produto.categoria
    document.getElementById("preco").value = produto.preco
    document.getElementById("avaliacao").value = produto.avaliacao
}
fnCarregarDados()

// Delete - [DELETE] /produto/ :id
 
 
let foto = document.getElementById("foto")
let btn_salvar = document.getElementById("btn-salvar-produto")
 
 
foto.addEventListener("blur", function () {
    fnAlterarFoto()
})
 
btn_salvar.addEventListener("click", function () {
    fnSalvarProdutos()
    fnCriarToast()
})
 
// TOAST
function fnCriarToast() {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
}
 
 
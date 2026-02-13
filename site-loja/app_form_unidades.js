function fnAlterarFoto() {
    if (foto.value != '') {
        document.getElementById("fundo-imagem").style.backgroundImage = `url('${foto.value}')`
    } else {
        document.getElementById("fundo-imagem").style.backgroundImage = `url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
    }
    console.log(foto.value)
}

function fnLimparCampos() {
    document.getElementById("form-unidades").reset()
}

function fnCadastrarUnidades() {
     let formDados = {
        nome_da_loja: document.getElementById("nome_da_loja").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        endereco: document.getElementById("endereco").value,
        latitude: document.getElementById("latitude").value,
        longitude: document.getElementById("longitude").value,
        foto: document.getElementById("foto").value
    }    
    console.dir(formDados)

    fetch('http://localhost:3000/unidade/', {   
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

let foto = document.getElementById("foto")
let btn_salvar = document.getElementById("btn-salvar-unidade")      
        
foto.addEventListener("blur", function () {
    fnAlterarFoto()
})

btn_salvar.addEventListener("click", function () {
    fnCadastrarUnidades()
})


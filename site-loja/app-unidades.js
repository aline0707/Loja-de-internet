function fnMontarCardunidade(unidade){
    let cartao = `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3">
                <div class="card">
                    <img src="${unidade.foto}"
                        class="card-img-top" alt="${unidade.nome_da_loja}">
                    <div class="card-body">
                        <h5 class="card-title">${unidade.nome_da_loja}</h5>
                        <p class="card-text">${unidade.telefone}, ${unidade.email}, ${unidade.endereco}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light">
                        <button class="btn btn-primary btn-sm">Comprar</button>
                        <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-heart"></i></button>
                    </div>
                </div>
            </div>
    `
    document.querySelector(".lista-unidades").innerHTML += cartao
}

function fnCarregarDados() {
    fetch('http://localhost:3000/unidades/', { method: 'GET' })
    .then(response => response.json())
    .then((unidades) => {
        unidades.forEach(unidade => {
            fnMontarCardunidade(unidade)
        });
    })
    .catch(erro => console.log(erro.message))
}
fnCarregarDados()
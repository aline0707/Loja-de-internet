function fnExcluirProduto(id, elemento) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
        return
    }
    fetch('http://localhost:3000/produto/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resposta => resposta.json())
        .then((dados) => {
           elemento.closest("tr").remove()
            alert("Produto excluído com sucesso!")
    })
        .catch(erro => console.log(erro.message))
}
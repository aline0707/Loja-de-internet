function fnMontarLinhaProduto(produto) {
    let linha = `
                            <tr>
                                <td><img style="width: 70px; height: 70px;" src="${produto.foto}"></td>
                                <td>${produto.id}</td>
                                <td>${produto.titulo.substring(0,20)}</td>
                                <td>${produto.descricao.substring(0,70)}</td>
                                <td>${produto.categoria}</td>
                                <td>${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'})}</td>
                                <td>${"⭐".repeat(produto.avaliacao)}</td>
                                <td>
                                <a href="um-produto.html?id=${produto.id}" class="btn" title="Ver produto">🔎</a> 
                                <a href="editar-produto.html?id=${produto.id}" class="btn"  title="Editar produto">📝</a>
                                <button type="button" class="btn" title="Excluir Produto">❌</a>
                                </td>
                            </tr>
    `
 
    document.querySelector("#lista-produtos").innerHTML += linha
}
 
function fnCarregarDados() {
    fetch('http://localhost:3000/produtos/', { method: 'GET' })
 
 
        .then(resposta => resposta.json())
        .then((produtos) => {
            produtos.forEach(produto => {
                fnMontarLinhaProduto(produto)
            });
        })
        .catch(erro => console.log(erro.message))
}
 
fnCarregarDados()
const express = require('express')
const app = express()
/* Indica que todas as requisições podem receber BODY EM jSON. a partit disso, o express aplica um Json. parse para o conteudo recebido */
app.use(express.json())
app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('Loja de internet')
})
const lista_produtos = [
    {
        "titulo": "Red Nike",
        "foto":"https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxzaG9lfGVufDB8MHx8fDE3MjEwNDEzNjd8MA&ixlib=rb-4.0.3&q=80&w=1080",
        "descricao": "Tênis leve, com design versátil e acabamento moderno, perfeito para acompanhar sua rotina.",
        "preco": 499.00,
        "avaliacao": 5
    },
    {
        "titulo": "Blue Nike",
        "foto":"https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "descricao": "Modelo confortável, resistente e ideal para quem busca um visual urbano sem abrir mão do bem-estar.",
        "preco": 699.00,
        "avaliacao": 3
    },
    {
        "titulo": "Black Nike",
        "foto":"https://images.unsplash.com/photo-1643584549066-fc993fc9cb43?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "descricao": "Tênis com ajuste confortável, visual clean e solado que garante estabilidade em cada passo.",
        "preco": 799.00,
        "avaliacao": 4
    }
]
app.get("/produtos", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(lista_produtos)
})








app.listen(3000)
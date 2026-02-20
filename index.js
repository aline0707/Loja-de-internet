const express = require('express')
const app = express()
// necessário para permitir requisições de diferentes origens(dominios/servidores)
const cors = require('cors')
app.use(cors())

/* Indica que todas as requisições podem receber Body em JSON. A partir disso, o Express aplica um JSON.parse para o conteudo recebido */

app.use(express.json())

app.get('/', function (req, res) {
    res.send('Loja-Informatica')
})

let mysql = require('mysql')
let conexao = mysql.createConnection({
    host: "108.179.193.209",
    user: "gutoxa27_alunos",
    password: "JD_eXLNHp1ZG",
    database: "gutoxa27_bd_loja"
})

conexao.connect(function (erro) {
    if (erro) {
        console.log("Deu ruim na conexao \n")
        throw erro;
    } else {
        console.log("Conexão deu bom \n")
    }
})
// [
//     {
//         "titulo": "Red Nike",
//         "foto": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxzaG9lfGVufDB8MHx8fDE3MjEwNDEzNjd8MA&ixlib=rb-4.0.3&q=80&w=1080",
//         "descricao": "Tênis leve, com design versátil e acabamento moderno, perfeito para acompanhar sua rotina.",
//         "preco": 499.00,
//         "avaliacao": 5
//     },
//     {
//         "titulo": "Blue Nike",
//         "foto": "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "descricao": "Modelo confortável, resistente e ideal para quem busca um visual urbano sem abrir mão do bem-estar.",
//         "preco": 699.00,
//         "avaliacao": 3
//     },
//     {
//         "titulo": "Black Nike",
//         "foto": "https://images.unsplash.com/photo-1643584549066-fc993fc9cb43?q=80&w=1080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         "descricao": "Tênis com ajuste confortável, visual clean e solado que garante estabilidade em cada passo.",
//         "preco": 799.00,
//         "avaliacao": 4
//     }
// ]

// Read All - [GET] /unidades
// 1- trazer apenas 12 primeiros lista_produtos
// SELECT * FROM produtos LIMIT 12
// 2- trazer apenas produtos que comecem com a letra A
// SELECT * FROM produtos where nome titulo like 'A%';
// 3- trazer apenas produtos que tenham preco de 410
// SELECT * FROM produtos where preco = 410;
// 4- trazer apenas produtos com avaliacao 4 e 5 
// SELECT * FROM produtos where avaliacao = 5;
// 5- trazer apenas produtos com avaliacao 1 e 5
// SELECT * FROM produtos where avaliacao = 1 or avaliacao = 5;
// 6- trazer apenas produtos entre id 21 e 32
// SELECT * FROM produtos where id between 21 and 32;
// 7- trazer apenas os 12 ultimos produtos
// SELECT * FROM produtos ORDER BY id DESC LIMIT 12;
// 8- trazer apenas 12 primeiros produtos com avaliacao 5
// SELECT * FROM produtos ORDER BY avaliacao DESC LIMIT 12
// 9- trazer todos os produtos em ordem de preco do menor para o maior
// SELECT * FROM produtos ORDER BY preco ASC;
// 10- trazer todos os produtos em ordem de avaliação do menor para o maior
// SELECT * FROM produtos ORDER BY avaliacao ASC;

// objetivo: criar uma página para exibir em cards(com nome da unidade, foto, endereço, email, telefone) todas as 6 unidades

// 1 - duplicar a index.html e renomear para unidades.html
// 2 - duplicar o app.js e renomear para app-unidades.js
// 3 - no index.js criar a rota /unidades
// 4 - na rota /unidades fazer o select para retornar as unidades

// 5 - fazer os ajustes em unides.html, app-unidades.js e index.js necessários para funcionar a o página unidades.html

app.get("/unidades", function (req, res) {
    // res.send(lista_unidades)
    conexao.query("SELECT * FROM unidades", function (erro, lista_unidades, campos) {
        console.log("Listar_unidades");
        res.send(lista_unidades)
    })
})
app.get("/produtos", function (req, res) {
    conexao.query("SELECT * FROM produtos", function (erro, lista_produtos, campos) {
        console.log("Listar_produtos");
        res.send(lista_produtos)
    })
    })

    // Read One - [GET] /produto/
app.get("/produto/:id", function (req, res) {
    const id = req.params.id
    conexao.query("SELECT * FROM produtos where id = ?", [id], function (erro, dados, campos) {
        res.json(dados)
    })
})

    app.get("/produtos/:categoria", function (req, res) {
    const categoria = req.params.categoria
    conexao.query(`SELECT * FROM produtos where categoria='${categoria}'`, function (erro, dados, campos) {
    res.send(dados)
   })
})

app.get("/produtos/:categoria/:ordem", function (req, res) {
    const categoria = req.params.categoria
    const ordem = req.params.ordem
    conexao.query(`SELECT * FROM produtos where categoria='${categoria}' order by ${ordem}`, function (erro, dados, campos) {
    res.send(dados)
   })
})
     
app.post("/produto/", function (req, res) {
    const  data = req.body
    conexao.query('INSERT INTO produtos set?', [data],
        function (erro, resultado) {
        if (erro) {
         res.json(erro);
           
        }
         res.send(resultado.insertId);
    });
})

app.post("/unidade/", function (req, res) {
    const data= req.body;
    conexao.query('INSERT INTO unidades set?', [data], function (erro, resultado) {
        if (erro) {
         res.json(erro);
           
        }
         res.send(resultado.insertId);
    });
})
// LOGIN
app.post("/login/", function (req, res){
    const usuario = req.body.usuario
    const senha = req.body.senha
    conexao.query(`select * from usuarios where usuario = '${usuario}' and senha = '${senha}'`, function (erro, resultado, campos){
        if (erro){
            res.send(erro)
        }else{
            if (resultado.length > 0){
                res.sendStatus(200)
            }else{
                res.sendStatus(401)
            }
        }
    })
})

app.post("/usuario/", function (req, res) {
    const  data = req.body
    conexao.query('INSERT INTO usuarios set?', [data],
        function (erro, resultado) {
        if (erro) {
         res.json(erro);
           
        }
         res.send(resultado.insertId);
    });
})

app.listen(3000)




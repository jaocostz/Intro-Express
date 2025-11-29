const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const produtos = [
  { id: 1, nome: "One Piece - Vol. 1", preco: 29.90 },
  { id: 2, nome: "Naruto - Vol. 1", preco: 27.50 },
  { id: 3, nome: "Dragon Ball - Vol. 1", preco: 32.00 },
  { id: 4, nome: "Attack on Titan - Vol. 1", preco: 34.90 },
  { id: 5, nome: "My Hero Academia - Vol. 1", preco: 31.90 },
  { id: 6, nome: "Chainsaw Man - Vol. 1", preco: 33.50 },
  { id: 7, nome: "Demon Slayer - Vol. 1", preco: 28.90 },
  { id: 8, nome: "Jujutsu Kaisen - Vol. 1", preco: 30.00 },
  { id: 9, nome: "Fullmetal Alchemist - Vol. 1", preco: 35.00 },
  { id: 10, nome: "Death Note - Vol. 1", preco: 29.00 }
];

app.get("/produtos", (res) => {
    res.json(produtos);
})

app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).send({ erro: "Produto não foi encontrado!" });
    }

    res.json(produto);
})

app.post("/produtos", (req, res) => {
    const novoProduto = req.body;
    produtos.push(novoProduto);
    return res.status(201).json(novoProduto);
})

app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === id);

    if (produtoIndex === -1) {
        return res.status(404).send({ erro: "Produto não encontrado" });
    }

    produtos[produtoIndex] = { ...produtos[produtoIndex], ...req.body };
    res.json(produtos[produtoIndex]);
})

app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === id);

    if (produtoIndex === -1) {
        return res.status(404).send({ erro: "Produto não encontrado" });
    }

    produtos.splice(produtoIndex, 1);
    return res.status(204).send();
})


app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
})

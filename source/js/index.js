function listaProdutos() {
    for (let i = 0; i < data.length; i++) {
        let produtosListados = data[i]
        criadoraDeCard(produtosListados)
    }
}
function criadoraDeCard(objeto) {
    let li = document.createElement("li")
    let figure = document.createElement("figure")
    let img = document.createElement("img")
    let categoria = document.createElement("p")
    let h2 = document.createElement("h2")
    let descricao = document.createElement("p")
    let preco = document.createElement("span")
    let button = document.createElement("A")

    img.src = objeto.img
    img.alt = objeto.nameItem
    h2.innerText = objeto.nameItem
    descricao.innerText = objeto.description
    preco.innerText = `R$ ${objeto.value}.00`
    categoria.innerText = objeto.tag
    button.innerText = "Adicionar ao Carrinho"
    button.id = objeto.id

    li.classList.add("card")
    figure.classList.add("boxCardImg")
    img.classList.add("cardImg")
    categoria.classList.add("cardCategory")
    h2.classList.add("cardName")
    descricao.classList.add("cardDescricao")
    preco.classList.add("cardPreco")
    button.classList.add("cardButton")
    button.href = "#"

    figure.appendChild(img)
    li.append(figure, categoria, h2, descricao, preco, button)

    pendurarCards(li)
}
function pendurarCards(cards) {
    let vitrine = document.getElementById("vitrine")
    vitrine.appendChild(cards)
}

let menu = document.querySelectorAll("#menu a")
let navTodos = ""
let navAcessorios = ""
let navCalçados = ""
let navCamisetas = ""

for (let i = 0; i < menu.length; i++) {
    let options = menu[i]
    if (options.innerText == "Todos") {
        navTodos = menu[i]

    } else if (options.innerText == "Acessórios") {
        navAcessorios = menu[i]

    } else if (options.innerText == "Calçados") {
        navCalçados = menu[i]

    } else if (options.innerText == "Camisetas") {
        navCamisetas = menu[i]
    }
}
navTodos.addEventListener("click", function () {
    let vitrine = document.querySelector("#vitrine")
    vitrine.innerHTML = ""
    listaProdutos(data)
})
navAcessorios.addEventListener("click", function () {
    let vitrine = document.querySelector("#vitrine")
    vitrine.innerHTML = ""

    for (let i = 0; i < data.length; i++) {
        let produtosListados = data[i]
        if (produtosListados.tag == "Acessórios") {
            criadoraDeCard(produtosListados)
        }
    }
})
navCalçados.addEventListener("click", function () {
    let vitrine = document.querySelector("#vitrine")
    vitrine.innerHTML = ""
    let esgotados = document.createElement("h2")
    let soldOut = document.createElement("img")

    esgotados.innerText = "Infelizmente os Itens dessa Sessão foram esgotados...."
    soldOut.src = "source/img/fora_de_estoque.png"
    soldOut.alt = "Itens Fora de Estoque"

    esgotados.classList.add("foraDeEstoque")
    soldOut.classList.add("soldOut")

    vitrine.append(esgotados, soldOut)
})
navCamisetas.addEventListener("click", function () {
    let vitrine = document.querySelector("#vitrine")
    vitrine.innerHTML = ""

    for (let i = 0; i < data.length; i++) {
        let produtosListados = data[i]
        if (produtosListados.tag == "Camisetas") {
            criadoraDeCard(produtosListados)
        }
    }
})



let vitrine = document.querySelector("#vitrine")
let ulCarrinho = document.getElementById("carrinho")
let h2Carrinho = document.querySelector("#carrinho h2")
let pCarrinho = document.querySelector("#carrinho p")

vitrine.addEventListener("click", adicionarAoCarrinho)
let soma = 0

function adicionarAoCarrinho(event) {
    let button = event.target
    if (button.tagName == "A") {
        vitrine.innerHTML = ""
        h2Carrinho.remove()
        pCarrinho.remove()
        listaProdutos(data)
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == button.id) {
                soma += somadorDeProdutos(data[i].value)
                listarItensCarrinho(data[i])
            } 
        }
    }
}

ulCarrinho.addEventListener("click", removerItensCarrinho)
function removerItensCarrinho(event) {
    if (event.target.tagName == "A") {
        event.target.closest("li").remove()
        let verificao = document.getElementsByClassName("liCarrinho").length
        if (verificao == 0) {
            ulCarrinho.append(h2Carrinho, pCarrinho)
        }
    } 
}

function listarItensCarrinho(produto) {
    let li = document.createElement("li")
    let img = document.createElement("img")
    let div = document.createElement("div")
    let h2 = document.createElement("h2")
    let preco = document.createElement("span")
    let button = document.createElement("A")
    
    img.src = produto.img
    img.alt = produto.nameItem
    h2.innerText = produto.nameItem
    preco.innerText = `R$ ${produto.value}.00`
    button.innerText = "Remover"

    li.classList.add("liCarrinho")
    h2.classList.add("h2Carrinho")
    img.classList.add("imgCarrinho")
    div.classList.add("boxValues")
    preco.classList.add("precoCarrinho")
    button.classList.add("buttonCarrinho")

    div.append(h2, preco, button)
    li.append(img, div)
    
    return ulCarrinho.appendChild(li)
}

function somadorDeProdutos(valor) {
    let soma = 0
    let total = soma + valor
    return total 
}

function subtradorDeProdutos(valor) {
    let result = valor - soma
    return result
}

let pesquisar = document.querySelector("#entradas input")
let buscar = document.querySelector("#entradas button")
buscar.addEventListener("click", pesquisarProdutos)
function pesquisarProdutos() {

    if (pesquisar.value !== "") {
        vitrine.innerHTML = ""
        for (let i = 0; i < data.length; i ++) {
            if (pesquisar.value == data[i].nameItem) {
                criadoraDeCard(data[i])
    
            } else if (pesquisar.value == data[i].tag) {
                criadoraDeCard(data[i])
            }
        }
    }
}

listaProdutos(data)
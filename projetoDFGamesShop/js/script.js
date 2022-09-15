let xhttp = new XMLHttpRequest();
let lsProduto = [];
function acessarProduto() {
    xhttp.open("GET", "https://dfgamesshop.herokuapp.com/produto/");
    xhttp.send();
    xhttp.onload = function () {
        lsProduto = this.response;
        lsProduto = JSON.parse(lsProduto);
        montarListaConsoles(lsProduto);
    }
}

function montarListaConsoles(lsProduto) {
    let listaProduto = "";
    let i = 0;
    for (produto of lsProduto) {
        listaProduto += `
        <div class="embrulho">
        <div class="produto">
            <img src="${produto.imagem}" alt="">
            <p>${produto.nome}
               <span class="preco">R$${produto.valor.toFixed(2)}</span> 
            </p>
            <i class="material-icons carrinho" onclick="addProduto(${i})" >&#xe8cb;</i>
        </div>
        </div>
        `;
        produto.carrinho = false;
        i++;
    }
    document.getElementById("listaConsoles").innerHTML = listaProduto;
}

function addProduto(i) {
    let produto = lsProduto[i];
    if (produto.carrinho == false) {
        produto.carrinho = true;
        document.getElementsByClassName("carrinho")[i].style.color = "#000000";
    } else {
        produto.carrinho = false;
        document.getElementsByClassName("carrinho")[i].style.color = "white";
    }

}

function verProdutosAdded() {
    for (produto of lsProduto) {
        if(produto.carrinho){
            
        }
    }
}

acessarProduto();

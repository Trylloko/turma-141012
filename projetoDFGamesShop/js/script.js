let xhttp = new XMLHttpRequest();

function acessarProduto() {
    xhttp.open("GET", "https://dfgamesshop.herokuapp.com/produto/");
    xhttp.send();
    xhttp.onload = function () {
        let lsProduto = this.response;
        lsProduto = JSON.parse(lsProduto);
        montarListaConsoles(lsProduto);
    }
}

function montarListaConsoles(lsProduto) {
    let listaProduto = "";
    for (produto of lsProduto) {
        listaProduto += `
        <div class="embrulho">
        <div class="produto">
            <img src="${produto.imagem}" alt="">
            <p>${produto.nome}
               <span class="preco">${produto.valor.toFixed(2)}</span> 
            </p>
            <i class="material-icons">&#xe8cb;</i>
        </div>
        </div>
        `;
    }
    document.getElementById("listaConsoles").innerHTML = listaProduto;
}
acessarProduto();

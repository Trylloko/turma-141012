let xhttp = new XMLHttpRequest();
let lsProduto = [];

function buscarProduto() {
    xhttp.open("GET", "https://pascoa-chiquinha.herokuapp.com/produto/");
    xhttp.send();
    xhttp.onload = function () {
        lsProduto = this.response;
        lsProduto = JSON.parse(lsProduto);
        montarListaProdutosHtml(lsProduto);
        marcarProdutosSelecionadosLocalStorage();
    }
}


function montarListaProdutosHtml(lsProduto) {
    let listaProduto = "";
    let i = 0;
    for (produto of lsProduto) {
        listaProduto += `
        <div class="embrulho">
            <div class="produto">
                <img src="${produto.imagem}" alt="">
                <p> ${produto.nome};
                    <span class="valor">${produto.valor.toFixed(2)}</span>
                </p>
                <i class="material-icons carrinho" onclick="addProdutoCarrinho(${i})">&#xe8cc;</i>
            </div>
        </div>`;
        produto.carrinho = false;
        i++;
    }
    document.getElementById("listaProduto").innerHTML = listaProduto;
}

function marcarProdutosSelecionadosLocalStorage() {
    let lista = localStorage.getItem("listaProdutoLocalStorage");
    lista = JSON.parse(lista);
    for (i in lista) {
        if (lista[i].carrinho) {
            addProdutoCarrinho(i);
        }
    }
}
function addProdutoCarrinho(i) {
    let produto = lsProduto[i];
    if (produto.carrinho == false) {
        produto.carrinho = true;
        //console.log(produto);
        document.getElementsByClassName("carrinho")[i].style.color = "#e66b6b";
    } else {
        produto.carrinho = false;
        document.getElementsByClassName("carrinho")[i].style.color = "#0000007d";
    }
    localStorage.setItem("listaProdutoLocalStorage", JSON.stringify(lsProduto));
}

function verListaProdutosSelecionado() {
    let listaProduto = "";
    document.getElementById("listaProduto").innerHTML = "";
    let i = 0;
    let j = 0;
    for (produto of lsProduto) {
        if (produto.carrinho) {
            produto.quantidade = 1;
            listaProduto += `
        <div class="embrulho">
            <div class="produto">
                <img src="${produto.imagem}" alt="">
                <p> ${produto.nome};
                    <span class="valor">${produto.valor.toFixed(2)}</span>
                </p>
                <span class="btMaisMenos">
                <span class="btMais" onclick="add(1,${i},${j})">+ </span>
                <span class="btMenos" onclick="add(-1,${i},${j})">- </span>
                </span>
                <span class="quantidade">${produto.quantidade}</span>
            </div>
        </div>`
                ;
            i++;
        }
        j++;
    }
    document.getElementById("listaProduto").innerHTML = listaProduto;

}

function add(qt, i, j) {
    // console.log(qt+" "+i);
    // console.log(lsProduto[j]);
    lsProduto[j].quantidade +=qt;
    document.getElementsByClassName("quantidade")[i].innerHTML = lsProduto[j].quantidade;
}


buscarProduto();
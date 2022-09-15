let xhttp = new XMLHttpRequest();
let lsProduto = [];
function acessarProduto() {
    xhttp.open("GET", "https://dfgamesshop.herokuapp.com/produto/");
    xhttp.send();
    xhttp.onload = function () {
        lsProduto = this.response;
        lsProduto = JSON.parse(lsProduto);
        montarListaConsoles(lsProduto);
        selecionadosLocalStorage();
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
    document.getElementById("formulario").style.display = "none";
}

function selecionadosLocalStorage(){
    let lista = localStorage.getItem("lsProdutoLocalStorage");
    lista = JSON.parse(lista);
    for (i in lista) {
        if(lista[i].carrinho){
            addProduto(i);
        }
    }

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
    localStorage.setItem("lsProdutoLocalStorage",JSON.stringify(lsProduto));
}

let verCarrinho = false;

function verProdutosAdded() {
    if(verCarrinho){
        acessarProduto();
        verCarrinho = false;
    }else{
        verCarrinho = true;
    }
    let listaProduto = "";
    document.getElementById("listaConsoles").innerHTML = "";
    let i = 0;
    let j = 0;
    for (produto of lsProduto) {
        if(produto.carrinho){
            produto.quantidade = 1;
            listaProduto += `
            <div class="embrulho">
            <div class="produto">
                <img src="${produto.imagem}" alt="">
                <p> ${produto.nome}
                   <span class="preco">R$${produto.valor.toFixed(2)}</span> 
                </p>
                <span class="btMaisMenos">
                <span class="btMenos" onclick="add(-1,${i},${j})" >-</span>
                <span class="btMais" onclick="add(1,${i},${j})" >+</span>
                </span>
                <span class="quantidade">${produto.quantidade}</span>
            </div>
            </div>
            `;
            i++;
        }
        j++;
    }
    document.getElementById("listaConsoles").innerHTML = listaProduto;
    document.getElementById("formulario").style.display = "grid";
}

function add(qt, i, j) { 
    lsProduto[j].quantidade += qt;
    if(lsProduto[j].quantidade == 0){
        lsProduto[j].quantidade = 1;
        return;
    }
    document.getElementsByClassName("quantidade")[i].innerHTML = lsProduto[j].quantidade;
}

function enviarPedido() {
    let pedido = '';
    let valorFinal = 0;
    for (produto of lsProduto) {
        if(produto.carrinho){
            let subtotal = produto.quantidade * produto.valor;
            pedido += `${produto.nome} ${produto.quantidade} x ${produto.valor} = ${subtotal}\n`;
            valorFinal += subtotal;
        }
    }
    let nome = document.getElementById('nome').value;
    let endereco = document.getElementById('endereco').value;
    let msg = `Olá, gostaria de fazer o seguinte pedido:\n${pedido} \nTotal a ser pago: \nR$${valorFinal} \nNome: ${nome} \nEndereço: ${endereco}`;
    msg = encodeURI(msg);
    console.log(msg);
    let fone = '5561983370353'
    link = `https://api.whatsapp.com/send?phone=${fone}&text=${msg}`;
    window.open(link, '_blank');
}

acessarProduto();

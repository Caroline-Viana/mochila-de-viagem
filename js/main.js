const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {
    criaElemento(elemento);
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    // toda vez que o elemento é enviado perguntamos se ele já existe
    const existe = itens.find( elemento => elemento.nome === nome.value );

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    // Se já existe ele é atualizado pelo data atributes, se não, ele é adicionado
    if (existe) {
        itemAtual.id = existe.id;
        
        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else {
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual);

        // .push() insere o objeto itemAtual no array itens
        itens.push(itemAtual);
    }
    
    // stringify() transforma um objeto em texto
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

function criaElemento(item) {

    // adicionando um novo elemento (no casa uma li)
    const novoItem = document.createElement("li");
    // adicionando uma classe ao novo elemento
    novoItem.classList.add("item");
    // adicionando outro elemento exatamente como esta no HTML
    const numeroItem = document.createElement("strong");
    // alterando o elemento
    numeroItem.innerHTML = item.quantidade;
    // adicionando um data atributes chamado id ao elemento
    numeroItem.dataset.id = item.id;
    // O método appendChild devolve a referência do elemento filho para o elemento pai.
    novoItem.appendChild(numeroItem);
    // alterando o elemento novamente para adicionar mais um valor
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem);
    
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    // criando o botão
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao;
}

function deletaElemento(tag, id){
    tag.remove();
    //remover item do array
    itens.splice(itens.find(elemento => elemento.id === id), 1);
    //passando para o localstorage a remoção
    localStorage.setItem("itens", JSON.stringify(itens))
}
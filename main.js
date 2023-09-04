// Obtém elementos da página
const form = document.getElementById("novoItem")
const lista = document.getElementById("lista");

// Declara um array de escopo global que obtém dados salvos no localStorage se houver, senão cria um array vazio
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// Declara uma função para criar elementos na lista de itens
const criaElementos = (item) => {

    // Cria um novo item na lista e o adiciona a classe dos itens
    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    // Cria uma tag strong para conter a quantidade do item
    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = item.quantidade;

    numeroItem.dataset.id = item.id;        // numeroItem recebe como data-attribute o id de item 

    novoItem.appendChild(numeroItem);       // Determina numeroItem como filho de novoItem
    novoItem.innerHTML += item.nome;        // Add o nome ao novoItem
    novoItem.appendChild(botaoDeleta(item.id));    // Determina o botão de deletar a todos os itens inseridos

    lista.appendChild(novoItem);        // Determina novoItem como filho de lista

};

// Declara uma função para atualizar os elementos da lista de itens
const atualizaElemento = (item) => {

    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;

};

// Declara uma função para criar botões e deletar os itens da lista
const botaoDeleta = (id) => {

    const elementoBotao = document.createElement("button");     // Cria uma elemento do tipo button no HTML
    elementoBotao.innerText = "X";                              // Atribui o caractere X ao botão
    
    // 'Escuta' o click no botão remover e remove o respectivo item da lista
    elementoBotao.addEventListener("click", function() {

        deletaElemento(this.parentNode, id);

    });

    return elementoBotao;                                       // Retorna o botão

};

// Declara uma função auxiliar para deletar elementos
const deletaElemento = (tag, id) => {

    tag.remove();     // Remove o elemento que foi passado como parâmetro

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);       // Reposiciona os elementos no array baseado em seu id (data-Attribute)

    localStorage.setItem("itens", JSON.stringify(itens));       // Atualiza os elementos no localStorage

};

// Ao carregar a página, percorre os itens do array e, se houver, os cria
itens.forEach((elemento) => {
    criaElementos(elemento);
});

// 'Escuta' o envio de dados
form.addEventListener("submit", (e) => {

    e.preventDefault();     // Evita o envio automático do form

    // Obtém dados dos inputs do form
    const nome = e.target.elements['nome'];
    const quantidade = e.target.elements['quantidade'];

    // Busca a existência prévia do nome do item adicionado à lista (se existe ou não)
    const existe = itens.find(elemento => elemento.nome === nome.value)
    
    // Declara um objeto para auxiliar no armazenamento do localStorage
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if (existe) {       // Se existe elemento na lista

        itemAtual.id = existe.id;       // itemAtual recebe o id do item correspondente já existente

        atualizaElemento(itemAtual);     // Chama uma função para atualizar os elementos da lista

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;       // Atualiza os ids dos itens no localStorage()

    } else {        // Senão, a lista é criada e o item atual é colocado na última posição

        // Declara um operador ternário que define um id para o item adicionado com base em sua posição no array
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        criaElementos(itemAtual);       // Chama a função 'criaElementos'

        itens.push(itemAtual);      // Add o item atual ao array itens

    }

    // Add elementos ao localStorage
    localStorage.setItem("itens", JSON.stringify(itens));

    // Limpa os inputs do form e posiciona o cursor do usuário
    form.reset();
    form.nome.focus();

});
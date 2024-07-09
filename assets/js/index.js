// DOOMS -----
const inputTexto = document.getElementById("input-text");
const btnEnviar = document.getElementById("btn-enviar");
const ulLista = document.getElementById("ul-lista");
const ulComprados = document.getElementById("ul-comprado");
const divLista = document.querySelector(".div-lista");
const divComprados = document.querySelector(".div-comprados");

// VARS -----
let listaLocalStorage = JSON.parse(localStorage.getItem("itensLista"));
let itensLista = listaLocalStorage || [];

// FUNCOES -----
exibeElementoNaTela();

btnEnviar.addEventListener("click", salvaItem);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    salvaItem();
  }
});

function salvaItem() {
  const itemASerAdicionado = inputTexto.value.toLowerCase();

  if (inputTexto.value != "") {
    const itemRepetido = itensLista.some(
      (item) => item.nome === itemASerAdicionado
    );

    if (itemRepetido) {
      inputTexto.value = "";
      return;
    } else {
      let item = {
        nome: itemASerAdicionado,
        checkbox: false,
      };

      itensLista.push(item);
      inputTexto.value = "";
    }
  }

  exibeElementoNaTela();
}

function exibeElementoNaTela() {
  resetaElementos();
  colocasElementosDoom();
  adicionaEventoCheckbox();
  adicionaEventoBtnDelete();
  atualizaLocalStorage();

  function resetaElementos() {
    ulLista.innerHTML = "";
    ulComprados.innerHTML = "";
    divComprados.style.display = "none";
    divLista.style.display = "none";
  }

  function colocasElementosDoom() {
    let checkInput;
    itensLista.forEach((item, index) => {
      if (item.checkbox === false) {
        checkInput = "";
        ulLista.innerHTML += criaHtml(checkInput, item, index);
        divLista.style.display = "block";
      } else {
        checkInput = "checked";
        ulComprados.innerHTML += criaHtml(checkInput, item, index);
        divComprados.style.display = "block";
      }
    });
  }

  function adicionaEventoCheckbox() {
    const checkboxs = document.querySelectorAll(
      ".container1__div__span__itens__span__lista__ul-lista__itens__checkbox"
    );
    checkboxs.forEach((item) => item.addEventListener("click", clickCheckbox));
  }
}

function criaHtml(checkInput, item, index) {
  return `
  <li
    class="container1__div__span__itens__span__lista__ul-lista__itens"
  >
    <input
    class="container1__div__span__itens__span__lista__ul-lista__itens__checkbox"
    type="checkbox"
    name=""
    id='${index}'
    ${checkInput}
    />
      <label
    for='${index}'
      class="container1__div__span__itens__span__lista__ul-lista__itens__item"
    >
    ${item.nome}
    </label>
    <div
    class="container1__div__span__itens__span__lista__ul-lista__itens__div-botoes"
    >
      <button
      class="container1__div__span__itens__span__lista__ul-lista__itens__botao-deletar"
      id='${index}'
      >
        <img src="./assets/imgs/lixo.svg" alt="#" />
      </button>
    </div>
  </li> 
  `;
}

function clickCheckbox() {
  itensLista[this.id].checkbox = this.checked;
  exibeElementoNaTela();
}

function adicionaEventoBtnDelete() {
  const btnDeletar = document.querySelectorAll(
    ".container1__div__span__itens__span__lista__ul-lista__itens__botao-deletar"
  );

  btnDeletar.forEach((btn) => btn.addEventListener("click", deletarItem));
}

function deletarItem() {
  itensLista.splice(this.id, 1);
  let a = this.parentNode.parentNode;
  exibeElementoNaTela();
}

function atualizaLocalStorage() {
  localStorage.setItem("itensLista", JSON.stringify(itensLista));
}

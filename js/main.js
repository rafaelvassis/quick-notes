import { recuperarNotas, salvarNotas } from "./services/notaService.js";

// Elementos da página
const formulario = document.getElementById("form-nota");
const inputTitulo = document.getElementById("input-titulo");
const selectCategorias = document.getElementById("select-categoria");
const textAreaDescricao = document.getElementById("textarea-descricao");
const btnSalvar = document.getElementById("btn-salvar");
const areaMensagens = document.getElementById("area-mensagens");
const listaNotas = document.getElementById("lista-notas");

// Classe padrão
class Nota {
  constructor(id, titulo, categoria, descricao, dataCriacao) {
    this.id = id;
    this.titulo = titulo;
    this.categoria = categoria;
    this.descricao = descricao;
    this.dataCriacao = dataCriacao;
  }
}

let emEdicao = false;
let idEmEdicao = "";

// Carregamento inicial da página
let notas = recuperarNotas();
listarNotas(notas);

// Eventos
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  if (emEdicao) {
    notas = atualizarNota(
      notas,
      idEmEdicao,
      inputTitulo.value,
      selectCategorias.value,
      textAreaDescricao.value,
    );

    salvarNotas(notas);
    listarNotas(notas);

    limparFormulario();
  } else {
    const novaNota = criarNota(
      inputTitulo.value,
      selectCategorias.value,
      textAreaDescricao.value,
    );

    notas.push(novaNota);

    salvarNotas(notas);

    listarNotas(notas);

    limparFormulario();
  }
});

listaNotas.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-deletar")) {
    const idParaExcluir = e.target.dataset.id;

    notas = excluirNota(notas, idParaExcluir);

    salvarNotas(notas);
    listarNotas(notas);
  }
});

listaNotas.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-alterar")) {
    idEmEdicao = e.target.dataset.id;

    exibirNota(notas, idEmEdicao);

    emEdicao = true;

    btnSalvar.innerText = "Atualizar";
  }
});

// Funções auxiliáres
function criarNota(titulo, categoria, descricao) {
  return new Nota(
    crypto.randomUUID(),
    titulo,
    categoria,
    descricao,
    new Date().toLocaleDateString("pt-BR"),
  );
}

function atualizarNota(notas, id, titulo, categoria, descricao) {
  return notas.map((nota) => {
    if (nota.id === id) {
      return {
        ...nota,
        titulo,
        categoria,
        descricao,
      };
    }
    return nota;
  });
}

function excluirNota(notas, id) {
  return notas.filter((nota) => nota.id !== id);
}

function exibirNota(notas, id) {
  const notaEncontrada = notas.find((nota) => nota.id === id);

  if (notaEncontrada) {
    inputTitulo.value = notaEncontrada.titulo;
    selectCategorias.value = notaEncontrada.categoria;
    textAreaDescricao.value = notaEncontrada.descricao;
  }
}

function limparFormulario() {
  inputTitulo.value = "";
  selectCategorias.value = "Sem categoria";
  textAreaDescricao.value = "";
  emEdicao = false;
  idEmEdicao = "";
  btnSalvar.innerText = "Salvar";
}

function listarNotas(notas) {
  listaNotas.innerHTML = "";

  notas.forEach((nota) => {
    listaNotas.innerHTML += `
      <article class="card-nota">
        <div class="card-header">
          <h3 class="card-titulo">${nota.titulo}</h3>
          <span class="card-categoria">Categoria: ${nota.categoria}</span>
          <span class="card-data">Criado em: ${nota.dataCriacao}</span>
        </div>
        <p class="card-descricao">${nota.descricao}</p>
        <div class="card-footer">
          <button class="btn-alterar" data-id="${nota.id}">Alterar</button>
          <button class="btn-deletar" data-id="${nota.id}">Excluir</button>
        </div>
      </article>
    `;
  });
}

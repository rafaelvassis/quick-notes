import { recuperarNotas, salvarNotas } from "./services/notaService.js";
import * as NotaManager from "./managers/notaManager.js";

// Elementos da página
const formulario = document.getElementById("form-nota");
const inputTitulo = document.getElementById("input-titulo");
const selectCategorias = document.getElementById("select-categoria");
const textAreaDescricao = document.getElementById("textarea-descricao");
const btnSalvar = document.getElementById("btn-salvar");
const listaNotas = document.getElementById("lista-notas");
const areaMensagens = document.getElementById("area-mensagens");

// Estado das notas
let notas = recuperarNotas();
renderizarLista();

// Renderização Visual do DOM
function renderizarLista() {
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

function preencherFormulario(nota) {
  inputTitulo.value = nota.titulo;
  selectCategorias.value = nota.categoria;
  textAreaDescricao.value = nota.descricao;
}

function limparFormulario() {
  formulario.reset();
  selectCategorias.value = "Sem categoria";
  NotaManager.pararEdicao();
  btnSalvar.innerText = "Salvar";
}

function atualizarPersistenciaETela() {
  salvarNotas(notas);
  renderizarLista();
  limparFormulario();
}

// Eventos da aplicação
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const idEdicao = NotaManager.getNotaEmEdicao();

  if (idEdicao) {
    notas = NotaManager.atualizarNota(
      notas,
      idEdicao,
      inputTitulo.value,
      selectCategorias.value,
      textAreaDescricao.value,
    );
  } else {
    const novaNota = NotaManager.criarNota(
      inputTitulo.value,
      selectCategorias.value,
      textAreaDescricao.value,
    );
    notas.push(novaNota);
  }

  atualizarPersistenciaETela();
});

listaNotas.addEventListener("click", function (e) {
  const idElemento = e.target.dataset.id;

  if (e.target.classList.contains("btn-deletar")) {
    notas = NotaManager.excluirNota(notas, idElemento);

    if (idElemento === NotaManager.getNotaEmEdicao()) {
      NotaManager.pararEdicao();
    }

    salvarNotas(notas);
    renderizarLista();
    limparFormulario();
  }

  if (e.target.classList.contains("btn-alterar")) {
    NotaManager.iniciarEdicao(idElemento);
    const nota = NotaManager.encontrarNota(notas, idElemento);

    if (nota) {
      preencherFormulario(nota);
      btnSalvar.innerText = "Atualizar";
    }
  }
});

import { recuperarNotas, salvarNotas } from "./services/notaService.js";
import * as NotaManager from "./managers/notaManager.js";
import { validarNota } from "./utils/validarNota.js";
import { normalizarString } from "./utils/normalizarString.js";

// Elementos da página
const formulario = document.getElementById("form-nota");
const inputTitulo = document.getElementById("input-titulo");
const selectCategorias = document.getElementById("select-categoria");
const textAreaDescricao = document.getElementById("textarea-descricao");
const btnSalvar = document.getElementById("btn-salvar");
const listaNotas = document.getElementById("lista-notas");
const areaMensagens = document.getElementById("area-mensagens");

// Estado das notas
let notasArmazenadas = recuperarNotas();
renderizarLista(notasArmazenadas);

// Renderização Visual do DOM
function renderizarLista(notas) {
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
  areaMensagens.innerText = "";
}

function atualizarPersistenciaETela() {
  salvarNotas(notasArmazenadas);
  renderizarLista(notasArmazenadas);
  limparFormulario();
}

// Eventos da aplicação
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const idEdicao = NotaManager.getNotaEmEdicao();
  const titulo = normalizarString(inputTitulo.value);
  const descricao = normalizarString(textAreaDescricao.value);
  const categoria = selectCategorias.value;

  const validacao = validarNota(titulo, descricao);

  if (!validacao.valido) {
    areaMensagens.innerText = validacao.mensagem;
    return;
  }

  if (idEdicao) {
    notasArmazenadas = NotaManager.atualizarNota(
      notasArmazenadas,
      idEdicao,
      titulo,
      categoria,
      descricao,
    );
  } else {
    const novaNota = NotaManager.criarNota(titulo, categoria, descricao);
    notasArmazenadas.push(novaNota);
  }

  atualizarPersistenciaETela();
});

listaNotas.addEventListener("click", function (e) {
  const idElemento = e.target.dataset.id;

  if (e.target.classList.contains("btn-deletar")) {
    notasArmazenadas = NotaManager.excluirNota(notasArmazenadas, idElemento);

    if (idElemento === NotaManager.getNotaEmEdicao()) {
      NotaManager.pararEdicao();
    }

    salvarNotas(notasArmazenadas);
    renderizarLista(notasArmazenadas);
    limparFormulario();
  }

  if (e.target.classList.contains("btn-alterar")) {
    NotaManager.iniciarEdicao(idElemento);
    const nota = NotaManager.encontrarNota(notasArmazenadas, idElemento);

    if (nota) {
      preencherFormulario(nota);
      btnSalvar.innerText = "Atualizar";
    }
  }
});

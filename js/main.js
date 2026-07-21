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

// Carregamento inicial da página
let notas = recuperarNotas();
exibirNotas(notas);

// Eventos
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const novaNota = criarNota(
    inputTitulo.value,
    selectCategorias.value,
    textAreaDescricao.value,
  );

  notas.push(novaNota);

  salvarNotas(notas);

  exibirNotas(notas);

  limparFormulario();
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

function limparFormulario() {
  inputTitulo.value = "";
  selectCategorias.value = "Sem categoria";
  textAreaDescricao.value = "";
}

function exibirNotas(notas) {
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

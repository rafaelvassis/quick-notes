// Elementos da página
const formulario = document.getElementById("form-nota");
const inputTitulo = document.getElementById("input-titulo");
const selectCategorias = document.getElementById("select-categoria");
const textAreaDescricao = document.getElementById("textarea-descricao");
const btnSalvar = document.getElementById("btn-salvar");

const areaMensagens = document.getElementById("area-mensagens");

const listaNotas = document.getElementById("lista-notas");

// Classe 
class Nota {
  constructor(id, titulo, categoria, descricao, dataCriacao) {
    this.id = id;
    this.titulo = titulo;
    this.categoria = categoria;
    this.descricao = descricao;
    this.dataCriacao = dataCriacao;
  }
}

let notas = [];

btnSalvar.addEventListener("submit", (e) => {
  e.preventDefault();

  let titulo = inputTitulo.value;
  let categoria = selectCategorias.value;
  let descricao = textAreaDescricao.value;
  let dataCriacao = new Date().toLocaleDateString("pt-BR");

  let novaNota = new Nota(
    crypto.randomUUID(),
    titulo,
    categoria,
    descricao,
    dataCriacao,
  );

  notas.push(novaNota);

  inputTitulo.value = "";
  selectCategorias.value = "sem categoria";
  textAreaDescricao.value = "";


  listaNotas.innerHTML += `
        <article class="card-nota">
        <div class="card-header">
            <h3 class="card-titulo">${novaNota.titulo}</h3>
            <span class="card-categoria">Categoria: ${novaNota.categoria}</span>
            <span class="card-data">Criado em: ${novaNota.dataCriacao}</span>
        </div>
        
        <p class="card-descricao">
            ${novaNota.descricao}
        </p>
        
        <div class="card-footer">
            <button class="btn-alterar" data-id="${novaNota.id}">Alterar</button>
            <button class="btn-deletar" data-id="${novaNota.id}">Excluir</button>
        </div>
        </article>
    `;
});

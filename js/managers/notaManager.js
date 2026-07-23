class Nota {
  constructor(id, titulo, categoria, descricao, dataCriacao) {
    this.id = id;
    this.titulo = titulo;
    this.categoria = categoria;
    this.descricao = descricao;
    this.dataCriacao = dataCriacao;
  }
}

// Estado - Deve ser controlado apenas por funções
export let notaEmEdicao = null;

export function iniciarEdicao(id) {
  notaEmEdicao = id;
}

export function pararEdicao() {
  notaEmEdicao = null;
}

export function getNotaEmEdicao() {
  return notaEmEdicao;
}

export function criarNota(titulo, categoria, descricao) {
  return new Nota(
    crypto.randomUUID(),
    titulo,
    categoria,
    descricao,
    new Date().toLocaleDateString("pt-BR"),
  );
}

export function atualizarNota(notas, id, titulo, categoria, descricao) {
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

export function excluirNota(notas, id) {
  return notas.filter((nota) => nota.id !== id);
}

export function encontrarNota(notas, id) {
  return notas.find((nota) => nota.id === id);
}

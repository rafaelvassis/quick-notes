const TAM_MAX_TITULO = 80;
const TAM_MAX_DESCRICAO = 1000;

export function validarNota(titulo, descricao) {
  if (titulo === "") {
    return {
      valido: false,
      mensagem: "O título é obrigatório.",
    };
  }

  if (titulo.length > TAM_MAX_TITULO) {
    return {
      valido: false,
      mensagem: `O tamanho do título excede ${TAM_MAX_TITULO} caracteres.`,
    };
  }

  if (descricao.length > TAM_MAX_DESCRICAO) {
    return {
      valido: false,
      mensagem: `A descrição pode conter no máximo ${TAM_MAX_DESCRICAO} caracteres.`,
    };
  }

  return {
    valido: true,
  };
}

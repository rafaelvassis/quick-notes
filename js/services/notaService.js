export function salvarNotas(notas) {
  localStorage.setItem("minhas-notas", JSON.stringify(notas));
}

export function recuperarNotas() {
  try {
    return JSON.parse(localStorage.getItem("minhas-notas")) || [];
  } catch {
    return [];
  }
}

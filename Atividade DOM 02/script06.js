const botao = document.getElementById("botao");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", () => {
  const texto = document.getElementById("texto").value;
  const opcao = document.getElementById("opcao").value;

  if (opcao !== "") {
    resultado.textContent = converterTexto(texto, opcao);
  } else {
    resultado.textContent = "Escolha uma opção antes de converter.";
  }
});

function converterTexto(texto, opcao) {
    if (opcao === "mai") {
      return texto.toUpperCase();
    } else if (opcao === "min") {
      return texto.toLowerCase();
    } else {
      return texto;
    }
}
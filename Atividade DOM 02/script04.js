const selecionarImagem = document.getElementById("selecionarImagem");
const divResultado = document.getElementById("resultado");

selecionarImagem.addEventListener("change", function() {
const nomeImagem = selecionarImagem.value;
const img = document.createElement("img");
img.src = nomeImagem;
divResultado.innerHTML = "";
divResultado.appendChild(img);
});
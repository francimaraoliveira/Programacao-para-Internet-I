const btnCarregarImagem = document.getElementById("carregarImagem");
const divResultado = document.getElementById("resultado");

btnCarregarImagem.addEventListener("click", function() {
	const nomeImagem = document.getElementById("nomeImagem").value;
	const img = document.createElement("img");
	img.src = nomeImagem;
	divResultado.appendChild(img);
});
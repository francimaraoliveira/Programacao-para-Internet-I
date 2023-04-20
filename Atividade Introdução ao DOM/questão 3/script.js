// selecione o botão usando o método getElementById
var botao = document.getElementById("botao");
// adicione um evento de clique ao botão
botao.addEventListener("click", function() {
 // selecione o parágrafo usando o método getElementById
var paragrafo = document.getElementById("paragrafo");
// altere o texto do parágrafo
paragrafo.textContent = "O texto deste parágrafo foi alterado!";
});
function limparConteudo() {
    // Obtém o elemento do parágrafo pelo ID
    var paragrafo = document.getElementById("meuParagrafo");
    // Define o conteúdo do parágrafo como vazio
    paragrafo.innerHTML = "";
}       
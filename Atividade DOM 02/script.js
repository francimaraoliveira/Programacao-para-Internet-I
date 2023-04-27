document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('botaoExibir');
    botaoExibir.addEventListener('click', exibirConteudo);
});

function exibirConteudo() {
    var conteudo = document.getElementById('caixaDeTexto').value;
    document.getElementById('conteudo').innerHTML = conteudo;
}

function exibirConteudo() {
    var conteudo = document.getElementById('caixaDeTexto').value;
    if (conteudo.trim() === "") {
        document.getElementById('conteudo').innerHTML = '<span class="error">Por favor, preencha o campo!</span>';
        return;
    }
    document.getElementById('conteudo').innerHTML = conteudo;
}
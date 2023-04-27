document.addEventListener('DOMContentLoaded', function () {
    var btnMoverParaClonada = document.getElementById('btn-mover-para-clonada');
    btnMoverParaClonada.addEventListener('click', moverParaClonada);

    var btnMoverParaOriginal = document.getElementById('btn-mover-para-original');
    btnMoverParaOriginal.addEventListener('click', moverParaOriginal);
});

function moverParaClonada() {
    var selectOriginal = document.getElementById('select-original');
    var selectClonada = document.getElementById('select-clonada');
    var opcoesSelecionadas = selectOriginal.selectedOptions;
    for (var i = 0; i < opcoesSelecionadas.length; i++) {
        var opcaoSelecionada = opcoesSelecionadas[i];
        var novaOpcao = document.createElement('option');
        novaOpcao.textContent = opcaoSelecionada.textContent;
        novaOpcao.value = opcaoSelecionada.value;
        selectClonada.appendChild(novaOpcao);
        selectOriginal.removeChild(opcaoSelecionada);
    }
}

function moverParaOriginal() {
    var selectOriginal = document.getElementById('select-original');
    var selectClonada = document.getElementById('select-clonada');
    var opcoesSelecionadas = selectClonada.selectedOptions;
    for (var i = 0; i < opcoesSelecionadas.length; i++) {
        var opcaoSelecionada = opcoesSelecionadas[i];
        var novaOpcao = document.createElement('option');
        novaOpcao.textContent = opcaoSelecionada.textContent;
        novaOpcao.value = opcaoSelecionada.value;
        selectOriginal.appendChild(novaOpcao);
        selectClonada.removeChild(opcaoSelecionada);
    }
}
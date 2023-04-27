document.addEventListener('DOMContentLoaded', function () {
    var botaoInserir = document.getElementById('botaoInserir');
    botaoInserir.addEventListener('click', inserirNoSelect);
});

function inserirNoSelect() {
        var texto = document.getElementById('texto').value.trim();
        var select = document.getElementById('select');
        if (texto === '') return; // se o texto for vazio, não faz nada
        if (select.querySelectorAll('option').length >= 5) return; // se já houver 5 opções, não faz nada
        if (select.querySelector(`option[value="${texto}"]`)) return; // se o texto já estiver na lista, não faz nada
        var option = document.createElement('option');
        option.textContent = texto;
        option.value = texto;
        select.appendChild(option);
}
document.addEventListener('DOMContentLoaded', function () {
    var botaoInserir = document.getElementById('botaoInserir');
    botaoInserir.addEventListener('click', inserirNoSelect);
});

function inserirNoSelect() {
    var texto = document.getElementById('texto').value;
    var select = document.getElementById('select');
    var option = document.createElement('option');
    option.textContent = texto;
    select.appendChild(option);
}
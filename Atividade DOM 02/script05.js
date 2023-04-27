function validarCheckboxes() {
    var opcoes = document.getElementsByName("opcao");
    var peloMenosUmSelecionado = false;
    for (var i = 0; i < opcoes.length; i++) {
        if (opcoes[i].checked) {
            peloMenosUmSelecionado = true;
            break;
        }
    }
    if (peloMenosUmSelecionado) {
        document.getElementById("mensagem").innerHTML = "Pelo menos um checkbox foi selecionado.";
    } else {
        document.getElementById("mensagem").innerHTML = "Selecione pelo menos um checkbox.";
    }
}
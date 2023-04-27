function somar() {
    var campo1 = document.getElementById("campo1").value;
    var campo2 = document.getElementById("campo2").value;
    if (isNaN(campo1) || isNaN(campo2)) {
        document.getElementById("resultado").innerHTML = "Por favor, digite apenas números!";
        return;
    }
    var resultado = parseInt(campo1) + parseInt(campo2);
    document.getElementById("resultado").innerHTML = "O resultado da soma é: " + resultado;
}
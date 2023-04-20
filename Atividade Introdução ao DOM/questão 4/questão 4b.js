// Obtém a referência ao elemento
const elemento = document.getElementById('meuElemento');

// Acessa e modifica o conteúdo HTML do elemento usando innerHTML
console.log(elemento.innerHTML); // Saída: "<p>Olá <strong>mundo</strong>!</p>"
elemento.innerHTML = "<p>Hello <b>World</b>!</p>"; // Modifica o conteúdo HTML do elemento

// Acessa o conteúdo HTML do elemento após a modificação
console.log(elemento.innerHTML); // Saída: "<p>Hello <b>World</b>!</p>"
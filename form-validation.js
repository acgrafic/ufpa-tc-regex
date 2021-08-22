const regexRules = {
    name: {
        regularExpression: /^[A-Z][a-z]+\s+[A-Z][a-z]+$/,
        tittle: "Nome",
        instructions: "Deve receber o nome e o sobrenome, ambos não vazios, separados por um espaço; não deve aceitar caracteres especiais ou numéricos; o primeiro símbolo do nome e do sobrenome deve ser do alfabeto Γ, e os outros símbolos devem ser do alfabeto Σ.",
    },
    email: {
        regularExpression: /^[a-z]+@+[a-z]+.br$/,
        tittle: "E-mail",
        instructions: "As sentenças possuem símbolos de Σ e deve conter exatamente um símbolo “@”;não devem começar com o símbolo “@”; devem terminar com a sequência “.br”; devem ter,pelo menos, um símbolo de Σ entre o símbolo “@” e o “.br”",
    },
    senha: {
        regularExpression: /^((?=([A-Z]+([a-z]|[0-9]))|(([a-z]|[0-9])+[A-Z]))(?=([A-Z]|[a-z]|[0-9])+[0-9])([A-Z]|[a-z]|[0-9]){8})$/,
        tittle: "Senha",
        instructions: "As cadeias podem conter símbolos dos alfabetos Σ, Γ e N; devem, obrigatoriamente, ter pelo menos um símbolo do alfabeto Γ e um símbolo do alfabeto N; devem ter comprimento igual a 8",
    },
    cpf: {
        regularExpression: /^[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}$/,
        tittle: "CPF",
        instructions: "As cadeias devem ter o formato xxx.xxx.xxx-xx, onde x ∈ N. N.",
    },
    telefone: {
        regularExpression: /^([(][0-9]{2}[)][ ][9][0-9]{4}[-][0-9]{4})|([(][0-9]{2}[)][ ][9][0-9]{4}[0-9]{4})|([0-9]{2}[ ][9][0-9]{4}[0-9]{4})$/,
        tittle: "Telefone",
        instructions: "As cadeias devem ter o formato (xx) 9xxxx-xxxx ou (xx) 9xxxxxxxx ou xx 9xxxxxxxx, onde x ∈ N. N.",
    },
    datahorario: {
        regularExpression: /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}[ ][0-9]{2}[:][0-9]{2}[:][0-9]{2}$/,
        tittle: "Data e Horário",
        instructions: "As cadeias devem ter o formato dd/mm/aaaa hh:mm:ss, onde d, m, a, h, m, s ∈ N",
    },
    numeroreal: {
        regularExpression: /^(([+|-]*[0-9]{1,}[.][0-9]+)|([+|-]*[0-9]{1,}))$/,
        tittle: "Número real com ou sem sinal",
        instructions: "As cadeias devem começar com um dos símbolos do alfabeto {+, -, ε}; depois, pelo menos, um símbolo do alfabeto N; depois, exatamente, um símbolo separador {“.”}; para finalizar, pelo menos um símbolo do alfabeto N; exceção: números sem a parte fracionária também devem ser aceitos",
    },
};

function makeMenu() {
    var drop = document.querySelectorAll(".dropdown-menu");
    for (var [key, value] of Object.entries(regexRules)) {
        drop[0].innerHTML +=
            '<li><a class="dropdown-item action" href="#" action="changeFiled" field="' +
            key +
            '">' +
            value.tittle +
            "</a></li>";
    }
}

makeMenu();

(function() {
    ("use strict");

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var action = document.querySelectorAll(".action");

    // action to validade fields
    Array.prototype.slice.call(action).forEach(function(action) {
        action.addEventListener(
            "click",
            function(event) {
                var action = event.srcElement.attributes["action"];
                window[action.nodeValue](event);
            },
            false
        );
    });
})();

function validateRegEx() {
    var fieldToValidate = document.getElementById("fieldToValidate");
    var fieldSelected = document.getElementById("fieldSelected");
    var result = document.getElementById("result");

    if (
        regexRules[fieldSelected.value].regularExpression.test(
            fieldToValidate.value
        )
    ) {
        result.innerHTML +=
            '<div class="alert alert-success p-1 m-1" role="alert">' +
            fieldToValidate.value +
            " (Validado)";
    } else {
        result.innerHTML +=
            '<div class="alert alert-danger p-1 m-1" role="alert">' +
            fieldToValidate.value +
            " (Rejeitado)";
    }
}

function changeFiled(event) {
    var fieldSelected = document.getElementById("fieldSelected");
    var divInstructions = document.getElementById("instructions");
    var form = document.getElementById("form");

    form.className = "row g-3";

    var filedtoSelect = event.srcElement.attributes["field"];
    fieldSelected.value = filedtoSelect.nodeValue;

    divInstructions.querySelector("h4").innerHTML =
        regexRules[filedtoSelect.nodeValue].tittle;
    divInstructions.querySelector("p").innerHTML =
        regexRules[filedtoSelect.nodeValue].instructions;

    clear();
}

function clear() {
    var fieldSelected = document.getElementById("fieldSelected");
    var divInstructions = document.getElementById("instructions");
    var fieldToValidate = document.getElementById("fieldToValidate");
    var result = document.getElementById("result");

    fieldToValidate.value = "";
    result.innerHTML = "";

    var form = document.getElementById("form");
}
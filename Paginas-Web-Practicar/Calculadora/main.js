var signo = "";
var numeroAntesDelSigno;
var numeroDespuesDelSigno;

function ponerNumerosTextField (numero) {
    console.log(numero)
    document.getElementById("textNumeros").value += numero
}

function seleccionSignoOperativo (signoOperativo) {
    signo = signoOperativo;
    numeroAntesDelSigno = document.getElementById("textNumeros").value;
    document.getElementById("textNumeros").value = "";
    console.log("aaa", "    ", document.getElementById("textNumeros").value)
}

function sumarDosValores () {
    numeroDespuesDelSigno = document.getElementById("textNumeros").value;
    document.getElementById("textNumeros").value = (parseFloat(numeroAntesDelSigno) + parseFloat(numeroDespuesDelSigno));
}
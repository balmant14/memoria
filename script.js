const formas = [
    { nome: "estrela", simbolo: "⭐" },
    { nome: "coracao", simbolo: "❤️" },
    { nome: "circulo", simbolo: "🔵" },
    { nome: "quadrado", simbolo: "🟩" },
    { nome: "triangulo", simbolo: "🔺" },
    { nome: "losango", simbolo: "🔶" },
    { nome: "lua", simbolo: "🌙" },
    { nome: "hexagono", simbolo: "⬢" }
];

const tabuleiro = document.getElementById("tabuleiro");
const textoMovimentos = document.getElementById("movimentos");
const textoPares = document.getElementById("pares");
const botaoReiniciar = document.getElementById("reiniciar");

let primeiraCarta = null;
let bloqueado = false;
let movimentos = 0;
let paresEncontrados = 0;

function embaralhar(lista) {
    return lista.sort(() => Math.random() - 0.5);
}

function criarCarta(forma) {
    const carta = document.createElement("button");

    carta.classList.add("carta");
    carta.type = "button";
    carta.dataset.nome = forma.nome;
    carta.textContent = "?";

    carta.addEventListener("click", function () {
        virarCarta(carta, forma);
    });

    return carta;
}

function virarCarta(carta, forma) {
    if (
        bloqueado ||
        carta.classList.contains("virada") ||
        carta.classList.contains("encontrada")
    ) {
        return;
    }

    carta.classList.add("virada");
    carta.textContent = forma.simbolo;

    if (primeiraCarta === null) {
        primeiraCarta = carta;
        return;
    }

    movimentos++;

    textoMovimentos.textContent = movimentos;

    const segundaCarta = carta;

    if (
        primeiraCarta.dataset.nome === segundaCarta.dataset.nome
    ) {
        primeiraCarta.classList.add("encontrada");
        segundaCarta.classList.add("encontrada");

        paresEncontrados++;

        textoPares.textContent = paresEncontrados;

        primeiraCarta = null;

        if (paresEncontrados === formas.length) {
            setTimeout(function () {
                alert(
                    "Parabéns! Você encontrou todos os pares em " +
                    movimentos + " movimentos!"
                );
            }, 300);
        }

    } else {
        bloqueado = true;

        setTimeout(function () {
            primeiraCarta.textContent = "?";
            segundaCarta.textContent = "?";

            primeiraCarta.classList.remove("virada");
            segundaCarta.classList.remove("virada");

            primeiraCarta = null;
            bloqueado = false;

        }, 1000);
    }
}

function iniciarJogo() {
    tabuleiro.innerHTML = "";

    primeiraCarta = null;
    bloqueado = false;
    movimentos = 0;
    paresEncontrados = 0;

    textoMovimentos.textContent = "0";
    textoPares.textContent = "0";

    const cartas = embaralhar([
        ...formas,
        ...formas
    ]);

    cartas.forEach(function (forma) {
        const carta = criarCarta(forma);
        tabuleiro.appendChild(carta);
    });
}

botaoReiniciar.addEventListener("click", iniciarJogo);

iniciarJogo();
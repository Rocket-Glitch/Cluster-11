// MATHJAX 4
window.MathJax = {
    tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']]
    }
};

// Cargar MathJax
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js';
script.async = true;
script.onload = iniciar;
document.head.appendChild(script);


let pendientes = [];
let actual;
let aprendidas = 0;

// Cargar las preguntas.
async function iniciar() {
    const archivo = await fetch("data/derivadas.json");
    const datos = await archivo.json();

    pendientes = datos.tarjetas.sort(() => Math.random() - 0.5);

    mostrarSiguiente();
}

// Mostrar la siguiente pregunta.
async function mostrarSiguiente() {
    if (pendientes.length === 0) {
        document.getElementById("Pregunta").textContent = "¡Terminaste!";
        document.getElementById("progreso").textContent = "Todas aprendidas.";
        document.getElementById("Mostrar").hidden = true;
        document.getElementById("Rojo").hidden = true;
        document.getElementById("Verde").hidden = true;
       
        return;
    }

    actual = pendientes.shift();

    document.getElementById("Pregunta").textContent = actual.Pregunta;
    document.getElementById("Respuesta").textContent = actual.Respuesta;
    await MathJax.typesetPromise([
    document.getElementById("Pregunta")
]);
    document.getElementById("Respuesta").hidden = true;

    document.getElementById("Mostrar").hidden = false;
    document.getElementById("Rojo").hidden = true;
    document.getElementById("Verde").hidden = true;

    document.getElementById("progreso").textContent =
        `Aprendidas: ${aprendidas}`;
}

// Mostrar la respuesta.
document.getElementById("Mostrar").onclick = async () => {
    document.getElementById("Respuesta").hidden = false;
    document.getElementById("Mostrar").hidden = true;
    document.getElementById("Rojo").hidden = false;
    document.getElementById("Verde").hidden = false;

    await MathJax.typesetPromise([
        document.getElementById("Respuesta")
    ]);
};

// NO: devolver la pregunta al final.
document.getElementById("Rojo").onclick = () => {
    pendientes.push(actual);
    mostrarSiguiente();
};

// SÍ: marcar como aprendida y avanzar.
document.getElementById("Verde").onclick = () => {
    aprendidas++;
    mostrarSiguiente();
};

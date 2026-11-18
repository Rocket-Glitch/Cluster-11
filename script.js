const elementos = [
    { nombre: "Hidrógeno", numero: 1 },
    { nombre: "Helio", numero: 2 },
    { nombre: "Litio", numero: 3 },
    { nombre: "Berilio", numero: 4 },
    { nombre: "Boro", numero: 5 },
    { nombre: "Carbono", numero: 6 },
    { nombre: "Nitrógeno", numero: 7 },
    { nombre: "Oxígeno", numero: 8 },
    { nombre: "Flúor", numero: 9 },
    { nombre: "Neón", numero: 10 },
    { nombre: "Sodio", numero: 11 },
    { nombre: "Magnesio", numero: 12 },
    { nombre: "Aluminio", numero: 13 },
    { nombre: "Silicio", numero: 14 },
    { nombre: "Fósforo", numero: 15 },
    { nombre: "Azufre", numero: 16 },
    { nombre: "Cloro", numero: 17 },
    { nombre: "Argón", numero: 18 },
    { nombre: "Potasio", numero: 19 },
    { nombre: "Calcio", numero: 20 }
];

let preguntas = [];
let indiceActual = 0;
let bloqueado = false;
let temporizador = null;

const inicio = document.getElementById("inicio");
const zonaJuego = document.getElementById("zonaJuego");
const finalizado = document.getElementById("finalizado");
const pregunta = document.getElementById("pregunta");
const opciones = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");
const btnComenzar = document.getElementById("btnComenzar");
const btnInicio = document.getElementById("btnInicio");

function mezclar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function volverAlInicio() {
    if (temporizador) {
        clearTimeout(temporizador);
        temporizador = null;
    }

    inicio.hidden = false;
    zonaJuego.hidden = true;
    finalizado.hidden = true;
    preguntas = [];
    indiceActual = 0;
    bloqueado = false;
    opciones.replaceChildren();
    mensaje.textContent = "";
}

function iniciarQuiz() {
    preguntas = mezclar(elementos);
    indiceActual = 0;
    inicio.hidden = true;
    finalizado.hidden = true;
    zonaJuego.hidden = false;
    mostrarPregunta();
}

function mostrarPregunta() {
    if (indiceActual >= preguntas.length) {
        zonaJuego.hidden = true;
        finalizado.hidden = false;
        return;
    }

    bloqueado = false;
    const actual = preguntas[indiceActual];

    pregunta.textContent = `¿Cuál es el número atómico del ${actual.nombre}?`;
    mensaje.textContent = "";
    mensaje.className = "";
    opciones.replaceChildren();

    const numeros = Array.from({ length: 20 }, (_, i) => i + 1);
    const distractores = mezclar(
        numeros.filter(numero => numero !== actual.numero)
    ).slice(0, 4);
    const respuestas = mezclar([actual.numero, ...distractores]);

    respuestas.forEach(numero => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.textContent = numero;
        boton.className = "opcion";
        boton.addEventListener("click", () => responder(numero, actual.numero, boton));
        opciones.appendChild(boton);
    });
}

function responder(seleccionada, correcta, botonSeleccionado) {
    if (bloqueado) return;
    bloqueado = true;

    // Solo se colorea la alternativa que el usuario seleccionó.
    if (seleccionada === correcta) {
        botonSeleccionado.classList.add("correcta");
        mensaje.textContent = "¡Correcto!";
        mensaje.className = "mensaje-correcto";
    } else {
        botonSeleccionado.classList.add("incorrecta");
        mensaje.textContent = "¡Inténtalo otra vez más adelante!";
        mensaje.className = "mensaje-error";

        // La pregunta incorrecta se mueve al final de las pendientes.
        preguntas.push(preguntas[indiceActual]);
    }

    // Se bloquean las opciones sin cambiar su color.
    opciones.querySelectorAll("button").forEach(boton => {
        boton.disabled = true;
    });

    // Avance automático después de mostrar brevemente el color elegido.
    temporizador = setTimeout(() => {
        temporizador = null;
        indiceActual++;
        mostrarPregunta();
    }, 850);
}

btnComenzar.addEventListener("click", iniciarQuiz);
btnInicio.addEventListener("click", volverAlInicio);

volverAlInicio();

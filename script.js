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
let respondida = false;

const inicio = document.getElementById("inicio");
const zonaJuego = document.getElementById("zonaJuego");
const finalizado = document.getElementById("finalizado");
const pregunta = document.getElementById("pregunta");
const opciones = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");
const btnComenzar = document.getElementById("btnComenzar");
const btnSiguiente = document.getElementById("btnSiguiente");
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
    inicio.hidden = false;
    zonaJuego.hidden = true;
    finalizado.hidden = true;
    preguntas = [];
    indiceActual = 0;
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

    respondida = false;
    const actual = preguntas[indiceActual];

    pregunta.textContent = `¿Cuál es el número atómico del ${actual.nombre}?`;
    mensaje.textContent = "";
    mensaje.className = "";
    btnSiguiente.hidden = true;
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
        boton.addEventListener("click", () => {
            comprobarRespuesta(numero, actual.numero, boton);
        });
        opciones.appendChild(boton);
    });
}

function comprobarRespuesta(seleccionada, correcta, botonSeleccionado) {
    if (respondida) return;
    respondida = true;

    opciones.querySelectorAll("button").forEach(boton => {
        boton.disabled = true;
        if (Number(boton.textContent) === correcta) {
            boton.classList.add("correcta");
        }
    });

    if (seleccionada === correcta) {
        mensaje.textContent = "¡Correcto! Seguimos aprendiendo.";
        mensaje.className = "mensaje-correcto";
    } else {
        botonSeleccionado.classList.add("incorrecta");
        mensaje.textContent = `Todavía no. La respuesta correcta es ${correcta}. Esta pregunta volverá a aparecer más adelante.`;
        mensaje.className = "mensaje-error";

        // La pregunta fallada se agrega al final de las preguntas pendientes.
        preguntas.push(preguntas[indiceActual]);
    }

    btnSiguiente.textContent =
        indiceActual === preguntas.length - 1 ? "Terminar" : "Continuar";
    btnSiguiente.hidden = false;
}

btnComenzar.addEventListener("click", iniciarQuiz);

btnSiguiente.addEventListener("click", () => {
    indiceActual++;
    mostrarPregunta();
});

btnInicio.addEventListener("click", volverAlInicio);

// Al abrir la página, se muestra primero la bienvenida.
volverAlInicio();

let pendientes = [];
let actual = null;

const pregunta = document.getElementById("Pregunta");
const respuesta = document.getElementById("Respuesta");
const botonMostrar = document.getElementById("Mostrar");
const evaluacion = document.getElementById("Evaluacion");
const botonRojo = document.getElementById("Rojo");
const botonVerde = document.getElementById("Verde");

// Esperar a que MathJax esté listo antes de cargar y mostrar las tarjetas.
async function iniciar() {
  try {
    await MathJax.startup.promise;

    const archivo = await fetch("data/Derivadas/Basicas.json");
    if (!archivo.ok) {
      throw new Error(`No se pudo cargar el archivo: ${archivo.status}`);
    }

    const datos = await archivo.json();
    pendientes = [...datos].sort(() => Math.random() - 0.5);
    mostrarSiguiente();
  } catch (error) {
    pregunta.textContent = "No se pudieron cargar las tarjetas.";
    console.error(error);
  }
}

// Limpiar el render anterior y volver a procesar las fórmulas.
async function actualizarMatematicas(elemento) {
  MathJax.typesetClear([elemento]);
  await MathJax.typesetPromise([elemento]);
}

// Mostrar la siguiente tarjeta.
async function mostrarSiguiente() {
  if (pendientes.length === 0) {
    pregunta.textContent = "¡Terminaste! No quedan tarjetas pendientes.";
    respuesta.hidden = true;
    botonMostrar.hidden = true;
    evaluacion.hidden = true;
    return;
  }

  actual = pendientes.shift();

  pregunta.textContent = actual.Pregunta ?? "";
  respuesta.textContent = actual.Respuesta ?? "";
  respuesta.hidden = true;

  botonMostrar.hidden = false;
  evaluacion.hidden = true;

  await actualizarMatematicas(pregunta);
}

// Mostrar la respuesta y habilitar los botones de evaluación.
botonMostrar.addEventListener("click", async () => {
  respuesta.hidden = false;
  botonMostrar.hidden = true;
  evaluacion.hidden = false;

  await actualizarMatematicas(respuesta);
});

// Rojo: no la recordé. La tarjeta vuelve al final de la lista.
botonRojo.addEventListener("click", () => {
  pendientes.push(actual);
  mostrarSiguiente();
});

// Verde: la recordé. Se continúa con la siguiente tarjeta.
botonVerde.addEventListener("click", () => {
  mostrarSiguiente();
});

iniciar();

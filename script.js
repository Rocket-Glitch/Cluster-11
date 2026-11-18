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
{ nombre: "Calcio", numero: 20 } ];

        // VARIABLES DEL CUESTIONARIO
        let preguntas = [];
        let indiceActual = 0;
        let puntaje = 0;
        let respondida = false;

        // CONECTAMOS JAVASCRIPT CON HTML
        const contador = document.getElementById("contador");
        const pregunta = document.getElementById("pregunta");
        const opciones = document.getElementById("opciones");
        const mensaje = document.getElementById("mensaje");

        const btnSiguiente =
            document.getElementById("btnSiguiente");

        const zonaJuego =
            document.getElementById("zonaJuego");

        const resultado =
            document.getElementById("resultado");

        const textoResultado =
            document.getElementById("textoResultado");

        const btnReiniciar =
            document.getElementById("btnReiniciar");


        // FUNCIÓN PARA MEZCLAR LOS ELEMENTOS
        function mezclar(lista) {

            const copia = [...lista];

            for (let i = copia.length - 1; i > 0; i--) {

                const j = Math.floor(Math.random() * (i + 1));

                [copia[i], copia[j]] = [copia[j], copia[i]];
            }

            return copia;
        }


        // INICIAR EL CUESTIONARIO
        function iniciarQuiz() {

            preguntas = mezclar(elementos).slice(0, 10);

            indiceActual = 0;
            puntaje = 0;

            zonaJuego.hidden = false;
            resultado.hidden = true;

            mostrarPregunta();
        }


        // MOSTRAR UNA PREGUNTA
        function mostrarPregunta() {

            if (indiceActual >= preguntas.length) {
                mostrarResultado();
                return;
            }

            respondida = false;

            const actual = preguntas[indiceActual];

            contador.textContent =
                "Pregunta " + (indiceActual + 1) +
                " de " + preguntas.length;

            pregunta.textContent =
                "¿Cuál es el número atómico del " +
                actual.nombre + "?";

            mensaje.textContent = "";

            btnSiguiente.disabled = true;

            opciones.replaceChildren();


            // GENERAR CUATRO RESPUESTAS INCORRECTAS
            const numeros = Array.from(
                { length: 20 },
                (_, i) => i + 1
            );

            const distractores = mezclar(
                numeros.filter(numero => numero !== actual.numero)
            ).slice(0, 4);


            // UNIR LA RESPUESTA CORRECTA CON LAS CUATRO INCORRECTAS
            const respuestas = mezclar([
                actual.numero,
                ...distractores
            ]);


            // CREAR LOS CINCO BOTONES
            respuestas.forEach(numero => {

                const boton = document.createElement("button");

                boton.textContent = numero;
                boton.className = "opcion";

                boton.addEventListener("click", function () {

                    comprobarRespuesta(numero, actual.numero, boton);

                });

                opciones.appendChild(boton);

            });

        }


        // COMPROBAR SI LA RESPUESTA ES CORRECTA
        function comprobarRespuesta(seleccionada, correcta, boton) {

            if (respondida) {
                return;
            }

            respondida = true;

            const botones = opciones.querySelectorAll("button");

            botones.forEach(b => {

                b.disabled = true;

                if (Number(b.textContent) === correcta) {
                    b.classList.add("correcta");
                }

            });


            if (seleccionada === correcta) {

                puntaje++;

                mensaje.textContent =
                    "¡Correcto! Muy bien.";

            } else {

                boton.classList.add("incorrecta");

                mensaje.textContent =
                    "Incorrecto. La respuesta correcta es " +
                    correcta + ".";

            }

            btnSiguiente.disabled = false;

            if (indiceActual === preguntas.length - 1) {
                btnSiguiente.textContent = "Ver resultado";
            } else {
                btnSiguiente.textContent = "Siguiente pregunta";
            }

        }


        // AVANZAR A LA SIGUIENTE PREGUNTA
        btnSiguiente.addEventListener("click", function () {

            indiceActual++;

            mostrarPregunta();

        });


        // MOSTRAR EL RESULTADO FINAL
        function mostrarResultado() {

            zonaJuego.hidden = true;
            resultado.hidden = false;

            textoResultado.textContent =
                "Obtuviste " + puntaje +
                " respuestas correctas de " +
                preguntas.length + ".";

        }


        // VOLVER A JUGAR
        btnReiniciar.addEventListener("click", iniciarQuiz);


        // EJECUTAR EL CUESTIONARIO AL ABRIR LA PÁGINA
        iniciarQuiz();

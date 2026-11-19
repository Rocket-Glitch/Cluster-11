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
document.head.appendChild(script);


fetch("data/derivadas.json") // Cargar preguntas
.then(response => response.json()) // Leer datos
.then(data => {
    // Elegir pregunta aleatoria
    const number = Math.floor(Math.random() * data.tarjetas.length);

    // Mostrar pregunta
    document.getElementById("Pregunta").textContent = data.tarjetas[number].pregunta;
});

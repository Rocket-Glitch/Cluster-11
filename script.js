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


// Bring the questions.
bring("data/derivadas.json")
.then(data => {
create number = random(data.cards.amount);
document.find("question").text =
data.cards[number].question; });

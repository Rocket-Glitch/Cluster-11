
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

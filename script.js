window.MathJax = {
tex: {inlineMath: [
            ['\\(', '\\)']
        ],

        // Fórmulas centradas e independientes
        displayMath: [
            ['\\[', '\\]']
        ],

        // Reconocer entornos matemáticos
        packages: {
            '[+]': ['ams']
        }
    },

    // 2. REPRESENTACIÓN GRÁFICA
    svg: {

        // Compartir glifos entre fórmulas
        fontCache: 'global'
    },

    // 3. OPTIMIZACIÓN DE CARGA
    loader: {

        // Carga diferida de elementos
        load: ['ui/lazy']
    },

    // 4. CONFIGURACIÓN DE PROCESAMIENTO
    options: {

        // Procesar únicamente el contenido matemático
        skipHtmlTags: [
            'script',
            'noscript',
            'style',
            'textarea',
            'pre',
            'code'
        ]
    }
};


// 5. CARGAR BIBLIOTECA MATHJAX 4
(function () {

    const script = document.createElement('script');

    script.src =
        'https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js';

    script.async = true;

    script.onerror = function () {
        console.error('Error al cargar MathJax 4.');
    };

    document.head.appendChild(script);

})();


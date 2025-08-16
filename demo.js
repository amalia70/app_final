document.addEventListener('DOMContentLoaded', () => {
    // --- El código para el modal y los prompts ---
    const agentCards = document.querySelectorAll('.agent-card');
    const modal = document.getElementById('prompt-modal');
    const modalContent = document.getElementById('prompt-details');
    const closeModalBtn = document.getElementById('modal-close-btn');

    const agentsData = {
        creativo: {
            title: '✨ Agente Creativo (Coach Anti-Bloqueo)',
            prompts: [
                {
                    title: 'El prompt \'Coach Anti-Bloqueo\'',
                    content: `Actúa como mi coach de creatividad y estratega de contenido. Soy un agente inmobiliario y a veces me bloqueo y no sé qué publicar.\n\nTu única misión es ayudarme a encontrar una idea potente y específica para mi próximo contenido (un post, un vídeo, etc.). No debes escribir el contenido final, solo debes ayudarme a generar el TEMA a través de una conversación.\n\nTu método de coaching es el siguiente:\n1. Me harás preguntas inteligentes, una a la vez, para guiarme.\n2. Empezarás con una pregunta amplia sobre mi objetivo general.\n3. Basado en mi respuesta, profundizarás con preguntas sobre mi día a día: el mercado local, conversaciones con clientes, éxitos o frustraciones recientes.\n4. Al final de nuestra conversación, resumiré la idea que hemos generado en una sola frase clara y me sugerirás a qué otro agente (de Propiedades, Redes Sociales, Vídeo o Email) debería llevar esta idea para crear el contenido.\n\nPara empezar nuestra sesión de coaching, preséntate brevemente como mi \'Coach Anti-Bloqueo\' y hazme tu primera pregunta.`
                }
            ]
        },
        propiedades: {
            title: '🏠 Agente de Propiedades',
            prompts: [
                {
                    title: 'Prompt: Directo al Deseo',
                    content: `Actúa como un copywriter de élite para marcas inmobiliarias de prestigio, con un estilo similar al de las revistas de diseño como Architectural Digest. Tu objetivo es crear una descripción que sea vibrante, sofisticada y que venda un estilo de vida deseable. Usa frases potentes y un lenguaje que evoque exclusividad y beneficios claros. Sé inspirador, no novelesco.\n\nAquí están los detalles de la propiedad:\n- Tipo de Propiedad: [Ej: Piso con encanto]\n- Dirección: [Ej: Carrer de la Perla, 32, Gràcia, Barcelona]\n- Metros cuadrados: [Ej: 75]\n- Habitaciones: [Ej: 2]\n- Baños: [Ej: 1]\n- Características clave (3-5): [Ej: Balcón soleado, suelos de mosaico hidráulico, cocina abierta de diseño, techos altos con vigas de madera.]\n- Estilo/Ambiente: [Ej: Bohemio y acogedor]\n- Público objetivo: [Ej: Parejas jóvenes o profesionales creativos]\n\nEstructura el texto de la siguiente manera:\n\n1.  **Titular Atractivo:** Un título corto que resuma la esencia de la propiedad.\n2.  **Párrafo de Apertura (La Promesa):** En dos o tres frases, define la experiencia central de vivir aquí. ¿Qué sueño cumple esta propiedad?\n3.  **Puntos de Experiencia (3 viñetas):** Describe los 3 beneficios más potentes en 3 viñetas (bullet points). Cada viñeta debe empezar con un título en negrita.\n    *   **El Espacio Interior:** Habla del diseño, la luz y la atmósfera.\n    *   **Tu Rincón Privado:** Describe el balcón/terraza y su uso ideal.\n    *   **El Pulso del Barrio:** Habla de la vida en la zona y su energía.\n4.  **Llamada a la Acción (Exclusiva y Directa):** Una frase final, clara y que invite a una acción concreta.`
                }
            ]
        }
    };

    agentCards.forEach(card => {
        card.addEventListener('click', () => {
            const agentId = card.dataset.agent;
            const data = agentsData[agentId];

            let htmlContent = `<h2>${data.title}</h2>`;
            data.prompts.forEach(prompt => {
                htmlContent += `
                    <div class="prompt-item">
                        <h3>${prompt.title}</h3>
                        <pre><code>${escapeHtml(prompt.content)}</code></pre>
                        <button class="copy-btn">Copiar Prompt</button>
                    </div>
                `;
            });

            modalContent.innerHTML = htmlContent;
            modal.className = 'modal-visible';
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.className = 'modal-hidden';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.className = 'modal-hidden';
        }
    });
    
    document.addEventListener('click', function(event){
        if (event.target.classList.contains('copy-btn')){
            const codeElement = event.target.previousElementSibling.querySelector('code');
            const codeToCopy = codeElement.innerText;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                event.target.innerText = '¡Copiado!';
                setTimeout(() => {
                    event.target.innerText = 'Copiar Prompt';
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar: ', err);
            });
        }
    });

    function escapeHtml(unsafe) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
     }
});

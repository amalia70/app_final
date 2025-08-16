document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.agents-container');
    const header = document.querySelector('.main-header');
    const customLoginBtn = document.getElementById('custom-login-btn');

    // Ocultar contenido principal y botón de login por defecto
    mainContent.style.display = 'none';
    header.style.display = 'none';
    customLoginBtn.style.display = 'none';

    // Netlify Identity Widget Listeners
    netlifyIdentity.on('init', user => {
        if (user) {
            showContent(user);
        } else {
            showLoginButton();
        }
    });

    netlifyIdentity.on('login', user => {
        showContent(user);
        netlifyIdentity.close();
    });

    netlifyIdentity.on('logout', () => {
        mainContent.style.display = 'none';
        header.style.display = 'none';
        showLoginButton();
    });

    // Función para mostrar el contenido principal
    function showContent(user) {
        mainContent.style.display = 'grid';
        header.style.display = 'block';
        customLoginBtn.style.display = 'none'; // Ocultar botón de login si ya está logueado
    }

    // Función para mostrar el botón de login
    function showLoginButton() {
        customLoginBtn.style.display = 'block';
    }

    // Event listener para el botón de login personalizado
    customLoginBtn.addEventListener('click', () => {
        netlifyIdentity.open();
    });

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
                    content: `Actúa como mi coach de creatividad y estratega de contenido. Soy un agente inmobiliario y a veces me bloqueo y no sé qué publicar.\n\nTu única misión es ayudarme a encontrar una idea potente y específica para mi próximo contenido (un post, un vídeo, etc.). No debes escribir el contenido final, solo debes ayudarme a generar el TEMA a través de una conversación.\n\nTu método de coaching es el siguiente:\n1. Me harás preguntas inteligentes, una a la vez, para guiarme.\n2. Empezarás con una pregunta amplia sobre mi objetivo general.\n3. Basado en mi respuesta, profundizarás con preguntas sobre mi día a día: el mercado local, conversaciones con clientes, éxitos o frustraciones recientes.\n4. Al final de nuestra conversación, resumirás la idea que hemos generado en una sola frase clara y me sugerirás a qué otro agente (de Propiedades, Redes Sociales, Vídeo o Email) debería llevar esta idea para crear el contenido.\n\nPara empezar nuestra sesión de coaching, preséntate brevemente como mi \'Coach Anti-Bloqueo\' y hazme tu primera pregunta.`
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
        },
        redes: {
            title: '📱 Agente de Redes Sociales',
            prompts: [
                {
                    title: 'Prompt: Anunciar Nueva Propiedad',
                    content: `Actúa como un social media manager experto en el sector inmobiliario de lujo. Crea el texto para un post de Instagram y Facebook anunciando una nueva propiedad. El formato ideal es un carrusel de imágenes.\n\nDetalles de la propiedad:\n- Tipo de Propiedad y Titular: [Ej: Apartamento de diseño a estrenar]\n- Ubicación (Barrio/Ciudad): [Ej: La Dreta de l\'Eixample, Barcelona]\n- 3 Características Estrella: [1. Acabados de lujo Porcelanosa, 2. Sistema de domótica integrado, 3. Terraza privada de 20m²]\n- A quién le encantaría vivir aquí: [Ej: Un profesional o una pareja que busque lujo, tecnología y una ubicación inmejorable.]\n- Enlace de contacto/más info: [Ej: \'el enlace en nuestra bio\']\n\nGenera el siguiente contenido:\n1.  **Texto del Post:** Un texto principal (3-4 párrafos cortos) que sea atractivo y termine con una pregunta para fomentar la interacción.\n2.  **Sugerencias para Carrusel (5 diapositivas):** Describe brevemente qué imagen o vídeo corto poner en cada una de las 5 diapositivas del carrusel para contar una historia visual.\n3.  **Hashtags:** Una lista de 10-15 hashtags relevantes (mezclando populares y de nicho).`
                },
                {
                    title: 'Prompt: Tu Voz de Autoridad',
                    content: `Actúa como un estratega de marca personal para agentes inmobiliarios. El objetivo es crear un post de \'Consejo de la Semana\' para Instagram o Facebook que posicione al agente como un experto de confianza.\n\nInformación del Agente:\n- Nombre del Agente: [Tu Nombre]\n- Tu especialidad: [Ej: Ayudar a familias a encontrar su primera casa, experto en el mercado de lujo de Marbella, etc.]\n- Tema del consejo de hoy: [Ej: \'Un error común al negociar el precio de compra\', \'La importancia del home staging\', \'La mejor época del año para vender tu casa\']\n\nEscribe un post que siga esta estructura:\n1.  **Gancho Fuerte:** Una pregunta o afirmación que capte la atención inmediatamente.\n2.  **Desarrollo del Consejo:** Explica el consejo de forma clara, sencilla y directa. Usa una lista de 2-3 puntos si es necesario.\n3.  **Cierre con Autoridad:** Termina con una frase que refuerce tu experiencia y una llamada a la interacción (ej: \'¿Estás de acuerdo? ¡Te leo en los comentarios!\').\n4.  **Idea para la imagen:** Sugiere una idea para la foto o el gráfico que acompañaría al texto.`
                },
                {
                    title: 'Prompt: Imán de Clientes (Dinámico)',
                    content: `Actúa como un experto en marketing de respuesta directa. Crea el texto para un anuncio en Instagram/Facebook con el objetivo de captar emails de clientes potenciales. La oferta es una guía gratuita en PDF.\n\nDetalles de la Guía:\n- Título de la Guía: [Ej: \'La Guía Definitiva para Comprar tu Primera Casa en [Año Actual]\']\n- Año Actual: [Escribe aquí el año en curso, ej: 2025]\n- Principal problema que resuelve: [Ej: El miedo y la confusión del proceso de compra]\n- 3 Beneficios clave de la guía: [1. Checklist paso a paso, 2. Errores a evitar, 3. Claves para negociar]\n- Público objetivo: [Ej: Compradores primerizos, inversores, etc.]\n\nGenera un texto de anuncio que:\n1.  Hable directamente al dolor del público objetivo.\n2.  Presente la guía como la solución definitiva.\n3.  Liste los 3 beneficios clave en un formato atractivo (ej. con emojis).\n4.  Tenga una llamada a la acción muy clara y directa para descargar la guía (ej: \'Haz clic en el enlace de mi perfil para descargarla GRATIS ahora\').`
                }
            ]
        },
        video: {
            title: '🎬 Agente de Vídeo',
            prompts: [
                {
                    title: 'Prompt: Director de Reels',
                    content: `Actúa como un director y guionista de vídeos virales para redes sociales, especializado en contenido de confianza. Tu misión es crear un guion detallado para un vídeo de 60 segundos.\n\nEl tema del vídeo es: [Escribe aquí el tema]\nEl público objetivo son: [Describe aquí al público]\nEl tono debe ser: [Ej: Tranquilizador, claro y muy empático.]\n\nGenera un guion estructurado por escenas, segundo a segundo, que incluya:\n1.  **La acción o el plano visual** (lo que se ve en cámara).\n2.  **El diálogo** (lo que digo a cámara).\n3.  **El texto que aparece en pantalla**.\n\nAquí tienes la estructura:\n\n- **Escena 1: El Gancho (0-5 segundos)**\n- **Escena 2: El Problema (5-20 segundos)**\n- **Escena 3: La Solución en 3 Pasos (20-50 segundos)**\n- **Escena 4: La Llamada a la Acción (50-60 segundos)**`
                },
                {
                    title: 'Prompt: Productor de YouTube (Completo)',
                    content: `Actúa como un productor de contenido para un canal de YouTube de éxito, especializado en explicar temas complejos de forma sencilla y fiable.\n\nMi objetivo es crear el guion para un vídeo de entre 5 y 8 minutos.\nEl tema del vídeo es: [Escribe aquí el tema]\nEl público objetivo son: [Describe aquí al público]\n- El tono debe ser: [Ej: Claro, paciente, didáctico]\n\nGenera una estructura completa para el vídeo, que incluya:\n1.  **Título del Vídeo:** Un título optimizado para búsquedas en YouTube (SEO).\n2.  **Guion del Vídeo:** Un guion detallado, dividido en secciones (Hook, Introducción, Cuerpo del vídeo, Resumen, CTA). Para cada parte, describe el diálogo y las ideas para los elementos visuales.\n3.  **Descripción para YouTube:** Un texto para la descripción del vídeo, que incluya un resumen del contenido, timestamps para cada sección del guion y un espacio para enlaces relevantes.\n4.  **Ideas para la Miniatura (Thumbnail):** 2 conceptos diferentes para una miniatura atractiva, especificando el texto y la imagen a usar para maximizar los clics.`
                }
            ]
        },
        email: {
            title: '📧 Agente de Email Marketing',
            prompts: [
                {
                    title: 'Prompt: Constructor de Confianza',
                    content: `Actúa como un experto en email marketing y copywriting para el sector inmobiliario. Mi objetivo es crear una secuencia de bienvenida automática de 3 correos para las personas que se descargan mi guía gratuita.\n\nDetalles para la secuencia:\n- Mi Nombre: [Tu Nombre]\n- Nombre de la Guía que descargaron: [Ej: \'La Guía Definitiva para Comprar tu Primera Casa\']\n- Mi especialidad como agente: [Ej: \'ayudar a familias a encontrar la casa de sus sueños en la zona norte\']\n- Tono: Cercano, profesional y muy útil. Nada de venta agresiva.\n\nGenera los 3 correos siguientes:\n- **Email 1 (Inmediato):** Entregar la guía. Asunto y cuerpo del email.\n- **Email 2 (2 días después):** Aportar valor extra. Asunto y cuerpo.\n- **Email 3 (4 días después):** Presentación personal y llamada a la acción suave. Asunto y cuerpo.`
                },
                {
                    title: 'Prompt: Newsletter de Impacto',
                    content: `Actúa como un copywriter inmobiliario. Escribe un email para mi lista de suscriptores anunciando una nueva propiedad exclusiva.\n\nDetalles de la propiedad:\n- Titular del anuncio: [Ej: \'Ático con terraza de vistas panorámicas en El Born\']\n- 3 Puntos Fuertes: [1. Terraza de 40m², 2. Completamente reformado con diseño de lujo, 3. Luz natural todo el día]\n- Un detalle único o emocional: [Ej: \'Es el lugar perfecto para ver los atardeceres sobre la ciudad\']\n- Enlace a la ficha completa (fotos, etc.): [Pega aquí el enlace]\n\nEl email debe tener:\n1.  **Un Asunto Atractivo:** Corto y que genere curiosidad.\n2.  **Un Párrafo de Apertura:** Que conecte con el deseo del lector.\n3.  **Los 3 Puntos Fuertes:** Presentados en una lista fácil de leer (con viñetas).\n4.  **Una Llamada a la Acción (CTA) Clara:** Que invite a hacer clic en el enlace para ver más.`
                },
                {
                    title: 'Prompt: Hola, ¿sigues ahí?',
                    content: `Actúa como un agente inmobiliario que quiere reconectar con un lead que no ha interactuado en los últimos 3 meses. El objetivo NO es vender, sino reactivar la conversación de forma genuina y útil.\n\nMis datos:\n- Mi Nombre: [Tu Nombre]\n- Un recurso útil que he creado recientemente: [Ej: \'un nuevo vídeo de YouTube sobre cómo ha cambiado el mercado este trimestre\']\n- Enlace al recurso: [Pega aquí el enlace]\n\nEscribe un email que cumpla con lo siguiente:\n1.  **Asunto Personal:** Que no suene a marketing masivo (ej: \'Una pregunta rápida\').\n2.  **Cuerpo del Email Corto y Directo:**\n    - Recuérdale brevemente quién eres.\n    - Menciona que ha pasado un tiempo.\n    - Ofrécele el recurso útil sin pedir nada a cambio.\n    - Termina con una pregunta abierta y sencilla para que sea fácil responder (ej: \'¿Sigues buscando en la misma zona o han cambiado tus planes?\').`
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
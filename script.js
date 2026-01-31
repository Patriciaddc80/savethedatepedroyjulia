// Configuración de la fecha del evento
const eventDate = new Date('May 14, 2027 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostrar resultados
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

    // Si la cuenta regresiva termina
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "¡Es el gran día!";
    }
}

// Efecto de escribir letra por letra para los nombres
function typeWriterEffect() {
    const titleElement = document.getElementById('names-title');
    const fullContent = titleElement.innerHTML; // Guardamos el contenido con HTML (br, span)
    
    // Limpiamos el contenido pero mantenemos la estructura para el efecto
    titleElement.innerHTML = '';
    titleElement.style.opacity = '1';

    // Función para procesar el contenido y crear nodos de texto letra por letra
    // Para simplificar y mantener el HTML (br y span), usaremos una técnica de visibilidad progresiva
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = fullContent;
    
    const nodes = Array.from(tempDiv.childNodes);
    let totalDelay = 0;

    nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const letters = node.textContent.split('');
            letters.forEach(letter => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.opacity = '0';
                span.style.filter = 'blur(10px)';
                span.style.transition = 'opacity 2.5s ease-in-out, transform 2.5s cubic-bezier(0.1, 0, 0.1, 1), filter 2.5s ease-in-out';
                span.style.transform = 'translateY(20px) scale(0.9)';
                span.style.display = 'inline-block';
                span.style.whiteSpace = 'pre';
                titleElement.appendChild(span);
                
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0) scale(1)';
                    span.style.filter = 'blur(0)';
                }, totalDelay);
                totalDelay += 150; // Ritmo aún más pausado y solemne
            });
        } else if (node.nodeName === 'BR') {
            const br = document.createElement('br');
            titleElement.appendChild(br);
        } else if (node.nodeName === 'SPAN') {
            // Para el ampersand o la "y" roja
            const spanWrapper = document.createElement('span');
            spanWrapper.className = node.className;
            spanWrapper.textContent = node.textContent;
            spanWrapper.style.opacity = '0';
            spanWrapper.style.display = 'inline-block';
            spanWrapper.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-out';
            spanWrapper.style.transform = 'scale(0.8)';
            titleElement.appendChild(spanWrapper);
            
            setTimeout(() => {
                spanWrapper.style.opacity = '1';
                spanWrapper.style.transform = 'scale(1)';
            }, totalDelay);
            totalDelay += 150;
        }
    });
}

// Actualizar cada segundo
const countdownInterval = setInterval(updateCountdown, 1000);

// Ejecutar al cargar
window.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    typeWriterEffect();
});
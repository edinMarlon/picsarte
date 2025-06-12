function addToCart(productName, price, imageUrl) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Crear un objeto del producto con nombre, precio e imagen
    const product = {
        productName,
        price,
        imageUrl
    };

    // Agregar el producto al carrito
    cart.push(product); 

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); 

    // Actualizar el contador del carrito
    updateCartDisplay(); 
}

// Función para actualizar el contador del carrito
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    
    // Actualizar el número de productos en el carrito
    cartCount.innerText = cart.length;
}
// Función para abrir el chat de WhatsApp (mostrar el modal)
function openWhatsAppChat() {
    document.getElementById('whatsapp-chat-modal').classList.remove('hidden');
}

// Función para cerrar el chat de WhatsApp (cerrar el modal)
function closeWhatsAppChat() {
    document.getElementById('whatsapp-chat-modal').classList.add('hidden');
}
// Función para navegar en el carrusel
function setupCarousel(carouselId) {
    let currentIndex = 0;

    const carousel = document.querySelector(`#${carouselId} .carousel-images`);
    const totalImages = carousel.querySelectorAll('img').length;
    const prevButton = document.querySelector(`#${carouselId} .prev`);
    const nextButton = document.querySelector(`#${carouselId} .next`);

    // Función para actualizar el carrusel
    function updateCarousel() {
        const newTransformValue = -currentIndex * 100; // Desplazar la fila de imágenes
        carousel.style.transform = `translateX(${newTransformValue}%)`;
    }

    // Navegar a la imagen anterior
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--; // Desplazarse hacia atrás
        } else {
            currentIndex = totalImages - 1; // Volver a la última imagen
        }
        updateCarousel(); // Actualizar la posición del carrusel
    });

    // Navegar a la imagen siguiente
    nextButton.addEventListener('click', () => {
        if (currentIndex < totalImages - 1) {
            currentIndex++; // Desplazarse hacia adelante
        } else {
            currentIndex = 0; // Volver a la primera imagen
        }
        updateCarousel(); // Actualizar la posición del carrusel
    });
}

// Inicializar todos los carruseles al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Llamamos a la función de inicialización para cada carrusel
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach((carousel, index) => {
        setupCarousel(`carousel-${index}`);
    });
});

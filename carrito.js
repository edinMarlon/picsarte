// Cargar productos desde localStorage 
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para cargar los productos del carrito
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');

    // Verificamos si el carrito está vacío
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
    } else {
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor de productos

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('bg-gray-700', 'p-4', 'rounded-lg', 'mb-4');
            li.innerHTML = `
                <div class="flex items-start space-x-4">
                    <div class="relative w-80 h-80 rounded-lg overflow-hidden">
                        <img id="product-image-${index}" src="${item.imageUrl}" alt="${item.productName}" class="w-full h-full object-cover">
                        <div 
                            id="overlay-${index}"
                            class="absolute inset-0 rounded-lg mix-blend-multiply opacity-70 transition-all duration-300"
                            style="background-color: ${item.color || '#f15688'};">
                        </div>
                    </div>

                    <div class="flex-1">
                        <p class="text-white font-semibold mb-2">${item.productName} - $${item.price}</p>

                        <!-- Tallas -->
                        <div>
                            <label class="text-sm text-white block mb-1">Talla</label>
                            <div class="grid grid-cols-3 gap-2">
                                ${['38', '39', '40', '41', '42'].map(size =>
                `<button class="py-1 px-2 rounded text-sm ${item.size === size ? 'bg-yellow-400 text-black' : 'bg-gray-600 text-white'}" onclick="updateItemSize(${index}, '${size}')">${size}</button>`
            ).join('')}
                            </div>
                        </div>

                        <!-- Color -->
                        <div class="mt-4">
                            <label class="text-sm text-white block mb-1">Color</label>
                            <input 
                                type="color" 
                                id="color-picker-${index}" 
                                class="w-12 h-12 rounded-full border-2 cursor-pointer" 
                                value="${item.color || '#f15688'}" 
                                onchange="updateItemColor(${index})"
                            />
                        </div>

                        <button class="bg-red-600 text-white py-1 px-3 rounded-lg mt-4" onclick="removeFromCart(${index})">Eliminar</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(li);
        });
    }
}

// INICIO
// actualizar el color del producto :)
function updateItemColor(index) {
    const colorPicker = document.getElementById(`color-picker-${index}`);
    const newColor = colorPicker.value;

    cart[index].color = newColor;
    localStorage.setItem('cart', JSON.stringify(cart));

    const overlay = document.getElementById(`overlay-${index}`);
    if (overlay) {
        overlay.style.backgroundColor = newColor;
    }

    const hueValue = hexToHueRotate(newColor);

    const img = document.getElementById(`product-image-${index}`);
    if (img) {
        img.style.filter = `hue-rotate(${hueValue}deg)`;
    }
}

//onvertir valores... 
function hexToHueRotate(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);

    const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;

    let hue = 0;
    if (delta !== 0) {
        if (max === rNorm) {
            hue = ((gNorm - bNorm) / delta) % 6;
        } else if (max === gNorm) {
            hue = ((bNorm - rNorm) / delta) + 2;
        } else {
            hue = ((rNorm - gNorm) / delta) + 4;
        }
        hue = Math.round(hue * 60);
        if (hue < 0) hue += 360;
    }

    return hue;
}
//FIN

// Función para actualizar la talla
function updateItemSize(index, size) {
    cart[index].size = size;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems(); // Recargamos para actualizar visualmente la selección
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Función para finalizar compra
function continueToCheckout(event) {
    event.preventDefault();

    if (cart.length > 0) {
        let message = "¡Quiero hacer el pedido de estos productos:\n";
        cart.forEach(item => {
            message += `${item.productName} - $${item.price}, Talla: ${item.size}, Color: ${item.color}\n`;
        });

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "967746159";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.location.href = whatsappLink;
    } else {
        alert('Tu carrito está vacío');
    }
}

// Cargar los productos cuando la página cargue
document.addEventListener('DOMContentLoaded', loadCartItems);
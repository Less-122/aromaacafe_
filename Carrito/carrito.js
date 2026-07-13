document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar todos los elementos necesarios
    const cartItemsContainer = document.querySelector('.cart-items-section');
    const subtotalElement = document.querySelector('.summary-row:nth-of-type(1) span:last-child');
    const totalElement = document.querySelector('.summary-row.total span:last-child');
    const btnConfirmar = document.querySelector('.btn-confirm-order');

    // 2. Función calcular y actualizar los totales del carrito
    function actualizarTotales() {
        const cartItems = document.querySelectorAll('.cart-item');
        let nuevoSubtotal = 0;
        let totalProductos = 0;

        cartItems.forEach(item => {
            // Obtener el precio unitario limpiando el signo de pesos
            const priceText = item.querySelector('.item-price').textContent;
            const precioUnitario = parseFloat(priceText.replace('$', ''));
            
            // Obtener la cantidad actual del input
            const cantidad = parseInt(item.querySelector('.qty-input').value);
            
            nuevoSubtotal += precioUnitario * cantidad;
            totalProductos += cantidad;
        });

        // Actualizar los textos en el panel de resumen jio
        subtotalElement.textContent = `$${nuevoSubtotal.toFixed(2)}`;
        totalElement.textContent = `$${nuevoSubtotal.toFixed(2)}`;
        
        // Actualizar el contador de productos en el texto del subtotal
        const subtotalLabel = document.querySelector('.summary-row:nth-of-type(1) span:first-child');
        subtotalLabel.textContent = `Subtotal (${totalProductos} producto${totalProductos !== 1 ? 's' : ''})`;

        // Si el carrito se queda vacío
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <p style="font-size: 1.2rem;">Tu carrito está vacío </p>
                    <p>¡Explora nuestro menú y añade tus antojos hogareños!</p>
                </div>
            `;
            btnConfirmar.disabled = true;
            btnConfirmar.style.opacity = '0.5';
            btnConfirmar.style.cursor = 'not-allowed';
        }
    }

    // clics
    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const cartItem = target.closest('.cart-item');
        
        if (!cartItem) return;

        const qtyInput = cartItem.querySelector('.qty-input');

        // Botón adquirir para la compras
        if (target.classList.contains('qty-btn') && target.textContent === '+') {
            qtyInput.value = parseInt(qtyInput.value) + 1;
            actualizarTotales();
        }

        // Botón de quitar prodcuto 
        if (target.classList.contains('qty-btn') && target.textContent === '-') {
            const valorActual = parseInt(qtyInput.value);
            if (valorActual > 1) {
                qtyInput.value = valorActual - 1;
                actualizarTotales();
            }
        }

        // Botón para eliminar el producto del carrito
        if (target.classList.contains('delete-item-btn')) {
            // Efecto visual sutil antes de borrar
            cartItem.style.transition = 'all 0.3s ease';
            cartItem.style.opacity = '0';
            cartItem.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                cartItem.remove();
                actualizarTotales();
            }, 300);
        }
    });

    // 4. Evitar que escriban números negativos o letras manualmente en el input
    cartItemsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('qty-input')) {
            let valor = parseInt(e.target.value);
            if (isNaN(valor) || valor < 1) {
                e.target.value = 1;
            }
            actualizarTotales();
        }
    });

    // 5. Alerta al confirmar pedido
    btnConfirmar.addEventListener('click', () => {
        alert('¡Pedido Confirmado!  Tu orden ha sido enviada. Recuerda que pagas al recoger en la sucursal de Aroma a Café. Gracias por tu prefencia');
    });
});
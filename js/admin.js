//Cambiar los titulos de acuerdo a la sección
function actualizarTitulo() {
        const tituloElemento = document.getElementById('titulo-seccion');
        const nombreArchivo = window.location.pathname.split('/').pop();
        
        const titulos = {
        'productos.html': 'Gestión de Productos',
        'usuarios.html': 'Gestión de Usuarios',
        'pedidos.html': 'Historial de Pedidos',
        'categorias.html': 'Gestión de Categorías',
        'dashboard.html': 'Panel de Control'
        };

        const nuevoTitulo = titulos[nombreArchivo] || 'Panel de Administración';
        
        if (tituloElemento) {
        tituloElemento.textContent = nuevoTitulo;
        }
        document.title = nuevoTitulo + ' | Panel Admin';
    }
    //Traer el header y la barra lateral
    fetch('admin_header.html')
        .then(response => response.text())
        .then(headerData => {
        document.getElementById('header-placeholder').innerHTML = headerData;

        return fetch('admin_menu.html');
        })
        .then(response => response.text())
        .then(menuData => {
        document.getElementById('menu-placeholder').innerHTML = menuData;

        actualizarTitulo();
        })
        .catch(error => {
        console.error('Error cargando los componentes:', error);
        });


      /*document.getElementById('test').onclick=function(){
                alert("Hola mundo")
      }*/

//Abrir modales añadir
document.addEventListener('click', function(e) {
  const btnAdd = e.target.closest('.btn-add');
  if (btnAdd) {
    const modalId = btnAdd.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    } else {
      console.warn('Modal con ID "' + modalId + '" no encontrado.');
    }
  }
});

const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  });
});

//Cerrar modales al hacer clic fuera 
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});
document.addEventListener("DOMContentLoaded", () => {
    // Llamada al menú principal
    cargarComponente("menu-placeholder", "admin_menu.html");
    
    // Llamada al segundo HTML que acompleta la interfaz
    cargarComponente("menu-complemento-placeholder", "admin_menu_extra.html");
});


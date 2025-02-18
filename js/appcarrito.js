// Variables globales para tomar elementos del HTML
let carrito = document.querySelector('#carrito');
let listaCursos = document.querySelector('#lista-cursos');
let contenedorCarrito = document.querySelector('#lista-carrito tbody');
let vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = []; // Aquí se guardarán los cursos que sean agregados

// Se cargan los event listeners
cargarEventListeners();

function cargarEventListeners() {
  // Cuando se da click en "Agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso);
  // Cuando se da click en la "X" para quitar un curso
  carrito.addEventListener('click', eliminarCurso);
  // Cuando se da click en "Vaciar carrito"
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

// Función para agregar un curso
function agregarCurso(e) {
  e.preventDefault();
  // Aqui aseguramos de que se hizo click en el botón de "agregar-carrito"
  if (e.target.classList.contains('agregar-carrito')) {
    // Subir dos niveles en el DOM para obtener el div del curso
    let curso = e.target.parentElement.parentElement;
    // Lee los datos del curso
    leerDatosCurso(curso);
  }
}

// Función para leer los datos del curso seleccionado
function leerDatosCurso(curso) {
  let infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  };

  // Verifica si el curso ya está en el carrito
  let existe = false;
  for (let i = 0; i < articulosCarrito.length; i++) {
    if (articulosCarrito[i].id === infoCurso.id) {
      articulosCarrito[i].cantidad++; // Si ya está, le suma 1 a la cantidad
      existe = true;
      break;
    }
  }
  // Si no existe, lo agrega al arreglo
  if (!existe) {
    articulosCarrito.push(infoCurso);
  }

  // Actualiza el HTML del carrito
  carritoHTML();
}

// Función para eliminar un curso del carrito
function eliminarCurso(e) {
  e.preventDefault();
  // Verifica que se haya clickeado en el enlace con "borrar-curso"
  if (e.target.classList.contains('borrar-curso')) {
    let cursoId = e.target.getAttribute('data-id');
    // Recorre el arreglo y elimina el curso que coincida con el ID
    for (let i = 0; i < articulosCarrito.length; i++) {
      if (articulosCarrito[i].id === cursoId) {
        articulosCarrito.splice(i, 1);
        break;
      }
    }
    // Actualiza la vista del carrito
    carritoHTML();
  }
}

// Función para mostrar los cursos del carrito en el HTML
function carritoHTML() {
  // Primero se limpia el HTML para evitar que se repitan cursos
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
  
  // Se recorre el arreglo y se agrega cada curso al HTML
  for (let i = 0; i < articulosCarrito.length; i++) {
    let curso = articulosCarrito[i];
    let row = document.createElement('tr');
    row.innerHTML = 
      '<td><img src="' + curso.imagen + '" width="100"></td>' +
      '<td>' + curso.titulo + '</td>' +
      '<td>' + curso.precio + '</td>' +
      '<td>' + curso.cantidad + '</td>' +
      '<td><a href="#" class="borrar-curso" data-id="' + curso.id + '">X</a></td>';
    contenedorCarrito.appendChild(row);
  }
}

// Función para vaciar el carrito (elimina todos los cursos del HTML)
function vaciarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}



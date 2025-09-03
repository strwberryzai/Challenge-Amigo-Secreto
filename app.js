//Almacenamiento de nombres de amigos
let amigos = [];

// Variable para controlar el estado del juego
let juegoTerminado = false;

// agregar un amigo a la lista
function agregarAmigo() {
    // Obtener el elemento input y su valo
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    
    // Validar que el campo no esté vacío
    if (nombreAmigo === '') {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }
    
    // Verificar que el nombre no esté duplicado
    if (amigos.includes(nombreAmigo)) {
        alert('Este nombre ya está en la lista. Por favor, ingresa un nombre diferente.');
        return;
    }
    
    // Agregar el nombre al array
    amigos.push(nombreAmigo);
    
    // Limpiar la entrada
    inputAmigo.value = '';
    
    // Actualizar la lista visual
    actualizarListaAmigos();
    
    // Enfocar nuevamente el input para facilitar agregar más nombres
    inputAmigo.focus();
}

// Función para actualizar la lista  de amigos
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    
    // Limpiar la lista actual
    listaAmigos.innerHTML = '';
    
    // Agregar cada amigo como un elemento de lista
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        li.setAttribute('role', 'listitem');
        listaAmigos.appendChild(li);
    });
}

// sortear un amigo secreto
function sortearAmigo() {
    // Si el juego ya terminó, ejecutar jugar de nuevo
    if (juegoTerminado) {
        jugarDeNuevo();
        return;
    }
    
    // Verificar que hay amigos en la lista
    if (amigos.length === 0) {
        alert('No hay amigos en la lista. Por favor, agrega al menos un nombre antes de sortear.');
        return;
    }
    
    // Generar un índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    
    // Obtener el amigo sorteado
    const amigoSorteado = amigos[indiceAleatorio];
    
    // Mostrar el resultado
    mostrarResultado(amigoSorteado);
}

// Función para mostrar el resultado del sorteo
function mostrarResultado(amigoSorteado) {
    const resultado = document.getElementById('resultado');
    
    // Limpiar resultados anteriores
    resultado.innerHTML = '';
    
    // Crear elemento para mostrar el resultado
    const li = document.createElement('li');
    li.textContent = ` El amigo secreto es: ${amigoSorteado}`;
    li.setAttribute('role', 'status');
    resultado.appendChild(li);
    
    // Marcar el juego como terminado y cambiar el botón
    juegoTerminado = true;
    cambiarBotonAJugarDeNuevo();
}

// Función para cambiar el botón a "Jugar de nuevo"
function cambiarBotonAJugarDeNuevo() {
    const botonSortear = document.querySelector('.button-draw');
    const textoBoton = botonSortear.querySelector('img').nextSibling;
    
    // Cambiar el texto del botón
    botonSortear.childNodes[botonSortear.childNodes.length - 1].textContent = 'Jugar de nuevo';
    
    // Cambiar el onclick del botón
    botonSortear.setAttribute('onclick', 'jugarDeNuevo()');
    botonSortear.setAttribute('aria-label', 'Jugar de nuevo - Reiniciar el juego');
}

// Función para reiniciar el juego
function jugarDeNuevo() {
    // Limpiar el array de amigos
    amigos = [];
    
    // Limpiar la lista visual
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    
    // Limpiar el resultado
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    
    // Limpiar el input
    const inputAmigo = document.getElementById('amigo');
    inputAmigo.value = '';
    
    // Enfocar el input
    inputAmigo.focus();
    
    // Restaurar el botón original
    restaurarBotonSortear();
    
    // Marcar el juego como no terminado
    juegoTerminado = false;
}

// Función para restaurar el botón de sortear
function restaurarBotonSortear() {
    const botonSortear = document.querySelector('.button-draw');
    
    // Restaurar el texto del botón
    botonSortear.childNodes[botonSortear.childNodes.length - 1].textContent = 'Sortear amigo';
    
    // Restaurar el onclick del botón
    botonSortear.setAttribute('onclick', 'sortearAmigo()');
    botonSortear.setAttribute('aria-label', 'Sortear amigo secreto');
}

// Permitir agregar amigos presionando Enter
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});

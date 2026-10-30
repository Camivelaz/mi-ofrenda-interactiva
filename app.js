const fotos = [
  {
    src: "img/foto1.jpg",
    descripcion: "Siempre vivirás en mi corazón. Gracias por llenar mi vida de cariño y momentos especiales"
  },
  {
    src: "img/foto2.jpg",
    descripcion: "Aunque ya no estés conmigo, siempre recordaré tu compañía y todo el amor que me diste."
  },
  {
    src: "img/foto3.jpg",
    descripcion: "Te ame toda tu vida, Te extrañare para el resto de la mia."
  }
];

// Variables principales
let indice = 0;

const imagen = document.getElementById("imagenOfrenda");
const descripcion = document.getElementById("descripcion");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const puntos = document.getElementById("puntos");
const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");
const iconoMusica = document.getElementById("iconoMusica");
const textoMusica = document.getElementById("textoMusica");

// Crear los indicadores de fotografías
function crearIndicadores() {
    puntos.innerHTML = "";

    fotos.forEach((foto, i) => {
        const punto = document.createElement("span");

        punto.classList.add("punto");

        punto.addEventListener("click", () => {
            mostrarFoto(i);
        });

        puntos.appendChild(punto);
    });
}

// Actualizar el indicador activo
function actualizarIndicadores() {
    const elementos = document.querySelectorAll(".punto");

    elementos.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indice);
    });
}

// Mostrar fotografía seleccionada
function mostrarFoto(nuevoIndice) {
    indice = (nuevoIndice + fotos.length) % fotos.length;

    imagen.src = fotos[indice].src;
    descripcion.textContent = fotos[indice].descripcion;

    actualizarIndicadores();
}

// Botón para fotografía anterior
anterior.addEventListener("click", () => {
    mostrarFoto(indice - 1);
});

// Botón para fotografía siguiente
siguiente.addEventListener("click", () => {
    mostrarFoto(indice + 1);
});

// Reproducir o pausar música
btnMusica.addEventListener("click", async () => {

    if (audio.paused) {
        try {
            await audio.play();

            iconoMusica.textContent = "⏸️";
            textoMusica.textContent = "Pausar música";
            btnMusica.classList.add("activo");

        } catch (error) {
            alert("No se pudo reproducir la música. Comprueba que el archivo MP3 sea válido.");
            console.error(error);
        }

    } else {
        audio.pause();

        iconoMusica.textContent = "▶️";
        textoMusica.textContent = "Reproducir música";
        btnMusica.classList.remove("activo");
    }
});

// Restablecer botón al terminar el audio
audio.addEventListener("ended", () => {
    iconoMusica.textContent = "▶️";
    textoMusica.textContent = "Reproducir música";
    btnMusica.classList.remove("activo");
});

// Iniciar la galería
crearIndicadores();
mostrarFoto(0);

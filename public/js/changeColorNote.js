// CODIGO PARA MOSTRAR Y SELECCIONAR EL COLOR DE LAS NOTAS:

// Seleccionamos la etiqueta del Color principal, otros colores, header de la nota y el input color
const mainColor = document.querySelector(".create__color-main");
const colors = document.querySelectorAll(".create__color");
const headerNote = document.querySelector(".create__header");
const inputColor = document.querySelector("#color");

// MOSTRAR Y OCULTAR LOS COLORES
// Agregamos un evento click al color principal
mainColor.addEventListener("click", function () {
    // Recorremos los demas colores
    for (let i = 0; i < colors.length; i++) {
        (function (index) {
            setTimeout(function () {
                // Si los colores ya estan visibles, los escondemos
                if (colors[index].style.display === "inline-block") {
                    colors[index].style.animation = "hideColors 0.4s ease-in-out";
                    setTimeout(function () {
                        colors[index].style.display = "none";
                    }, 100 * index);
                } else {
                    // Mostramos los colores con una animacion
                    colors[index].style.display = "inline-block";
                    colors[index].style.animation = "showColors 0.5s ease-in-out";
                }
            }, 200 * index);
        })(i);
    }
});

// SELECCIONAR Y APLICAR LOS COLORES
// Iniciamos ciclo sobre las etiquetas span que contienen los colores
colors.forEach((span) => {
    // Agregamos un evento click a cada span
    span.addEventListener("click", function () {
        // Cambiamos el color de fondo de headerNote y mainColor segun en span seleccionado
        headerNote.style.backgroundColor = window.getComputedStyle(this).backgroundColor;
        mainColor.style.backgroundColor = window.getComputedStyle(this).backgroundColor;
        // Asignamos el color seleccionado a una constante bgColor
        const bgColor = window.getComputedStyle(this).backgroundColor;

        // Establecemos los valores correspondientes para el inputColor según el bgColor seleccionado
        if (bgColor === "rgb(35, 61, 193)") {
            inputColor.value = "blue";
        } else if (bgColor === "rgb(70, 175, 204)") {
            inputColor.value = "light-blue";
        } else if (bgColor === "rgb(170, 70, 204)") {
            inputColor.value = "purple";
        } else if (bgColor === "rgb(163, 10, 10)") {
            inputColor.value = "red";
        }

        // Recorremos todos los span de los colores
        for (let i = 0; i < colors.length; i++) {
            (function (index) {
                setTimeout(function () {
                    // Si los colores ya están visibles, los escondemos con una animación
                    if (colors[index].style.display === "inline-block") {
                        colors[index].style.animation = "hideColors 0.4s ease-in-out";
                        setTimeout(function () {
                            colors[index].style.display = "none";
                        }, 100 * index);
                    }
                }, 200 * index);
            })(i);
        }
    });
});

// -----------------------------------------------------------------------------------------------------------------------------------------------------------









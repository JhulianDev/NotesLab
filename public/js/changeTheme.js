// CODIGO PARA SELECCIONAR Y APLICAR EL THEME DE LA APP:

// Creamos las constantes que haran referencia a las etiquetas de la plantilla ejs
const mainTheme = document.querySelector(".header__theme-main");
const themes = document.querySelectorAll(".header__theme");
const body = document.querySelector("body");
const logo = document.querySelector(".header__logo");
const avatar = document.querySelector(".header__avatar-user");
const favicon = document.querySelector("link[rel='shortcut icon']");
const userId = document.querySelector("#userId");


// Creamos un evento al cargar la pagina que aplique los cambios correspondientes 
// en la plantilla ejs segun los datos guardados en el localstorage
window.onload = function () {
    const storedBackgroundImage = localStorage.getItem(`backgroundImage_${userId.value}`);
    const storedBackgroundColor = localStorage.getItem(`backgroundColor_${userId.value}`);
    const storedLogo = localStorage.getItem(`logo_${userId.value}`);
    const storedAvatar = localStorage.getItem(`avatar_${userId.value}`);
    const storedFavicon = localStorage.getItem(`favicon_${userId.value}`);

    // Aplicamos los cambios segun los datos guardados en el localstorage
    if (storedBackgroundImage) {
        body.style.backgroundImage = storedBackgroundImage;
    }
    if (storedBackgroundColor) {
        mainTheme.style.backgroundColor = storedBackgroundColor;
    }
    if (storedLogo) {
        logo.src = storedLogo;
    }
    if (storedAvatar) {
        avatar.src = storedAvatar;
    }
    if (storedFavicon) {
        favicon.href = storedFavicon;
    }
};


// Creamos funcion para desplegar u ocultar los botones de seleccion del theme
mainTheme.addEventListener("click", function () {
    // Recorremos los demas colores
    for (let i = 0; i < themes.length; i++) {
        (function (index) {
            setTimeout(function () {
                // Si los colores ya estan visibles, los escondemos
                if (themes[index].style.display === "inline-block") {
                    themes[index].style.animation = "hideThemes 0.3s ease-in-out";
                    setTimeout(function () {
                        themes[index].style.display = "none";
                    }, 100 * index);
                } else {
                    // Mostramos los colores con una animacion
                    themes[index].style.display = "inline-block";
                    themes[index].style.animation = "showThemes 0.6s ease-in-out";
                }
            }, 200 * index);
        })(i);
    }
});

// Creamos una funcion que aplique los cambios correspondientes al theme seleccionado
// y guarde dichos cambios en el localstorage.
themes.forEach((span) => {
    span.addEventListener("click", function () {
        // Cambiar la imagen de fondo u el color del boton mainTheme
        body.style.backgroundImage = window.getComputedStyle(this).backgroundImage;
        mainTheme.style.backgroundColor = window.getComputedStyle(this).backgroundColor;
        // Cambiar el logo, avatar e icono de la pagina en base al theme escogido
        const bgColor = window.getComputedStyle(this).backgroundColor;
        if (bgColor === "rgb(35, 61, 193)") {
            logo.src = "/img/logo-blue.png";
            avatar.src = "/img/avatar-blue.png";
            favicon.href = "/img/isotipo-blue.ico";
        } else if (bgColor === "rgb(170, 70, 204)") {
            logo.src = "/img/logo-pink.png";
            avatar.src = "/img/avatar-pink.png";
            favicon.href = "/img/isotipo-pink.ico";
        }

        // Guardamos los cambios en el local storage
        localStorage.setItem(`backgroundImage_${userId.value}`, body.style.backgroundImage);
        localStorage.setItem(`backgroundColor_${userId.value}`, mainTheme.style.backgroundColor);
        localStorage.setItem(`logo_${userId.value}`, logo.src);
        localStorage.setItem(`avatar_${userId.value}`, avatar.src);
        localStorage.setItem(`favicon_${userId.value}`, favicon.href);


        // Recorremos todos los span de los colores
        for (let i = 0; i < themes.length; i++) {
            (function (index) {
                setTimeout(function () {
                    // Si los colores ya estan visibles, los escondemos
                    if (themes[index].style.display === "inline-block") {
                        themes[index].style.animation = "hideThemes 0.3s ease-in-out";
                        setTimeout(function () {
                            themes[index].style.display = "none";
                        }, 100 * index);
                    }
                }, 200 * index);
            })(i);
        }
    });
});






$(document).ready(function () {
    // ------------------- FUNCTIONS -------------------------
    function changeImageHeight(){
        var cw = $('.portfolio-section .images-container .imagen').width();
        cw = cw / 1.3;      // factor para que la imagen no aparezca tan 'cuadrada'
        $('.portfolio-section .images-container .imagen').css({
            'height': cw + 'px'
        });
    }

    function read_top_offsets(){
        me_section = $('#_me-ref').offset().top,
         portfolio = $('#_portfolio-section').offset().top,
          contacto = $('#_contact-section').offset().top;
    }

    // Función para mostrar los elementos de acuerdo al scroll (en este caso, el menú)
    function show_elements(altura, element, classname){
		/* scrollTop: su funcionalidad es la de obtener o establecer la posición 
		vertical del scroll dentro de un elemento */

		/* The vertical scroll position is the same as the number of pixels 
		that are hidden from view above the scrollable area. If the scroll 
		bar is at the very top, or if the element is not scrollable, 
		this number will be 0.*/
    	var scrollTop = $(document).scrollTop(),
    	/* Establece o devuelve las coordenadas de un elemento respecto al 
    	documento/web contenedor del mismo (toda la web). En este caso, 
    	obtenemos la cantidad de píxeles en el eje Y */
        altura_animada = $(element).offset().top;
		if (altura_animada - altura < scrollTop) {
			$(element).css({
				'opacity': '1'
			});
			$(element).addClass(classname);
		}
    }

    // Función para ocultar el menú de acuerdo al stop
    function hide_menu(altura, element, classname){
    	var scrollTop = $(document).scrollTop();
		if (altura > scrollTop) {
			$(element).css({
				'opacity': '0'
			});
			$(element).addClass(classname);
		}
    }

    // Llamamos a las funciones de mostrar y desaparecer items
    function hide_items_with_effect(){
        mostrar_items.each(function(){ show_elements(280, this, "showUpwards"); });
        desaparecer_items.each(function(){ hide_menu(350, this, "showUpwards"); });
    }

    // Animación para ir a la sección de 'about me' cuando el usuario presiona 'about me' nav button
    $('#about-me-btn, #explore-btn').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: me_section - 100
        }, 1000);
    });
    
    // Animación para ir a la sección de 'Portfolio' cuando el usuario presiona 'Portfolio' nav button
    $('#portfolio-btn').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: portfolio - 100
        }, 1000);
    });
    
    // Animación para ir a la sección de 'Contact me' cuando el usuario presiona 'Contact' nav button
    $('#contact-btn, #contact-me-section').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: contacto - 100
        }, 1000);
    });

    // ------------------- VARIABLES -------------------------
            var me_section = $('#_me-ref').offset().top,
                 portfolio = $('#_portfolio-section').offset().top,
                  contacto = $('#_contact-section').offset().top,
             mostrar_items = $('.mostrar'),
         desaparecer_items = $('.ocultar');

    // ------------------- Scroll effects ---------------------
    read_top_offsets();

    // Lo llamamos así no exista un redimensionamiento de la pantalla
    changeImageHeight();

    // Llamamos a la función para ocultar el menú si nos encontramos en la parte de arriba del todo
    hide_items_with_effect();

    // ------------------- Window resize events --------------------- 
    // Determinamos altura de la imagen de la sección Portfolio acuerdo a su ancho
    $(window).resize(function () {       // evento que se dispara cuando hay un cambio del ancho de pantalla
        changeImageHeight();
        read_top_offsets();
    });

    // ------------------- Scroll event -----------------------------
    $(window).scroll(hide_items_with_effect);

});
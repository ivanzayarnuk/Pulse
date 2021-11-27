'use strict';

/* Begin carousel */
$(document).ready(function(){
		$('.carousel__inner').slick({
				// dots: true,
				// infinite: true,
				speed: 1100,            // speed 1500 mseconds
				// adaptiveHeight: true,
				// autoplay: true,
				// autoplaySpeed: 1100,
				// fade: true,
				// cssEase: 'Linear'
				prevArrow: '<button type="button" class="slick-prev"><img src="img/slider/left.png"></button>',
				nextArrow: '<button type="button" class="slick-next"><img src="img/slider/right.png"></button>',
				responsive: [
						{
							breakpoint: 992,
							settings: {
								dots: false,
								arrows: false,
								mobileFirst:true,
								autoplay: true,
								autoplaySpeed: 1100
							}
						}
					]
			});
	/* End carousel */

			/* Переключення табів*/
				$('.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function(){
						$(this).addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
								.closest('div.container').find('div.catalog__content')
								.removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
				});

				function toggleSlide(item){
		
						$(item).each(function(i){
								$(this).on('click', function (e){
										e.preventDefault();
										$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
										$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
								});
						});
				}
				/* Натиснення на ссилку подробно і назад */
				toggleSlide('.catalog-item__link');
				toggleSlide('.catalog-item__back');


	// Script for modal Windows

		$('[data-modal=consultation]').on('click', function (){
				$('.overlay, #consultation').fadeIn('slow'); // Показує модальне вікно та підложку
		});

		$('.modal__close').on('click', function(){
				$('.overlay, #consultation, #thanks, #order').fadeOut('slow'); // Закриває всі модальні вікна та підложку
		});

		$('.button_mini').each(function(i){
				$(this).on('click',function(){
						$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
						$('.overlay, #order').fadeIn('slow');// Показує модальне вікно та підложку
				});
		});

		// Validaite
		

		function valideForms(form){
				$(form).validate({
						rules: {
								// simple rule, converted to {required:true}
								name:  {
										required: true,
										minlength: 2
									},
								phone: "required",
								// compound rule
								email: {
									required: true,
									email: true
								}
							},
							messages: {
								name:{
										required: "Будь ласка введіть своє ім'я",
										minlength: jQuery.validator.format("Введіть мінімум {0} символа імені!")
									},
								phone: "Введіть ваш номер тел",
								email: {
									required: "Будь ласка введіть ваш Email",
									email: "Не вірно введений адрес. Має бути так name@domain.com"
								}
							}
				});
		}
		
		valideForms('#consultation-form');
		valideForms('#consultation form');
		valideForms('#order form');

		$('input[name=phone]').mask("+38 (099)-999-99-99"),{autoclear: true};

		// Технология отправки форм Ajax

		$('form').submit(function(e){
			e.preventDefault();

			if (!$(this).valid()){
				return;
			}

			$.ajax({
					type:"POST",          //Получить даные или отдать серверу? POST- отдать даные на сервер
					url: "mailer/smart.php",
					data:$(this).serialize()                 
			}).done(function(){
				$(this).find("input").val(""); // Знайти всі інпути і очистити за допомогою val("")
				$('#consultation, #order').fadeOut();
				$('.overlay, #thanks').fadeIn('slow');

                $('form').trigger('reset');     // всі форми повинні очиститися
			});
            return false;
		});

		// Smooth scroll and pageup

	$(window).scroll(function(){
		if($(this).scrollTop() > 1600){
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}

		
	});	

	$("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

	$("a[href=#catalog]").click(function(){
        $("html, body").animate({scrollTop: $('.catalog').offset().top+"px"});
        return false;
    });

	// $("#up #catalog", ':not(a)').on('click', function(event) { // Задає плавний скрол

	// 	// Make sure this.hash has a value before overriding default behavior
	// 	if (this.hash !== "") {
	// 	  // Prevent default anchor click behavior
	// 	  event.preventDefault();
	
	// 	  // Store hash
	// 	  var hash = this.hash;
	
	// 	  // Using jQuery's animate() method to add smooth page scroll
	// 	  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	// 	  $('html, body').animate({
	// 		scrollTop: $(hash).offset().top
	// 	  }, 300, function(){
	   
	// 		// Add hash (#) to URL when done scrolling (default click behavior)
	// 		window.location.hash = hash;
	// 	  });
	// 	} // End if
	//   });

	  new WOW().init(); // Подключаем бібліотеку WOW.js
});

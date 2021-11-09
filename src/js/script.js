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

});

  /* End carousel */
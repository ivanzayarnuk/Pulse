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
                arrows: false
              }
            }
          ]
      });
  });

  /* End carousel */
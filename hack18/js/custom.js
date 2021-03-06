jQuery(document).ready(function( $ ) {

  // Preloader
  $(window).on('load', function() {
    $('#preloader').delay(100).fadeOut('slow',function(){$(this).remove();});
    Particles.init({
   // normal options
    selector: '.background',
    maxParticles: 450,
   // options for breakpoints
    responsive: [
      {
        breakpoint: 2000,
        options: {
          maxParticles: 300,
          sizeVariations:8,
          speed:0.8,
          color: '#03C4EB',
          connectParticles: false
        }
      }, {
        breakpoint: 768,
        options: {
          maxParticles: 60,
          speed:0.7,
          sizeVariations:6,
          color: '#03C4EB',
          connectParticles: true
        }
      }, {
        breakpoint: 425,
        options: {
          color:'#03C4EB',
          speed:0.7,
          sizeVariations:6,
          maxParticles: 60,
          connectParticles: true
        }
      }, {
          breakpoint: 320,
          options: {
            color:'#03C4EB',
            maxParticles: 60,
            sizeVariations:6,
            speed:0.7,
            connectParticles: true// disables particles.js
            }
          }
        ]
    });
  });

  // Hero rotating texts
  $("#hero .rotating").Morphext({
    animation: "flipInX",
    separator: ",",
    speed: 1000
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });

  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
      $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
      $('body').append( $mobile_nav );
      $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
      $('body').append( '<div id="mobile-body-overly"></div>' );
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

      $(document).on('click', '.menu-has-children i', function(e){
          $(this).next().toggleClass('menu-item-active');
          $(this).nextAll('ul').eq(0).slideToggle();
          $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });

      $(document).on('click', '#mobile-nav-toggle', function(e){
          $('body').toggleClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').toggle();
      });

      $(document).click(function (e) {
          var container = $("#mobile-nav, #mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
             if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
          }
      });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          if (target.length) {

              var top_space = 0;

              if( $('#header').length ) {
                top_space = $('#header').outerHeight();
              }

              $('html, body').animate({
                  scrollTop: target.offset().top - top_space
              }, 1500, 'easeInOutExpo');

              if ( $(this).parents('.nav-menu').length ) {
                $('.nav-menu .menu-active').removeClass('menu-active');
                $(this).closest('li').addClass('menu-active');
              }

              if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }

              return false;
          }
      }
  });

  // Back to top button
  $(window).scroll(function() {

      if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }

  });

  $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
      return false;
  });

  $('#form1').submit(function() {
    event.preventDefault();
    $.post("submit.php", {tName: $("#tName").val(), nm1: $("#nm1").val(), rn1: $("#rn1").val(), nm2: $("#nm2").val(), rn2: $("#rn2").val(), nm3: $("#nm3").val(), rn3: $("#rn3").val(), cntctnm: $("#cntctnm").val(), email: $("#email").val()}, function(data){
          var succ_data = "Added Successfully";
          if(data.localeCompare(succ_data)==0){
            $(".alr-msg").removeClass("alert-danger");
            $(".alr-msg").addClass("alert-success");
            $('#tName').val("");
            $('#nm1').val("");
            $('#rn1').val("");
            $('#nm2').val("");
            $('#rn2').val("");
            $('#nm3').val("");
            $('#rn3').val("");
            $('#cntctnm').val("");
            $('#email').val("");
          }
          $("#msg").html(data);
          $(".alr-msg").css('display','block');
    });
  });

});

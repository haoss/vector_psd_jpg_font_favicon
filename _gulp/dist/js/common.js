'use strict'

// Document ready
$(document).on('ready', function(){

  // E-mail Ajax Send
  // Documentation & Example: https://github.com/agragregra/uniMail
  $("form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
      alert("Thank you!");
      setTimeout(function() {
        // Done Functions
        th.trigger("reset");
      }, 1000);
    });
    return false;
  });

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  footerToggle();
  headerCatalog();
  headerLinks();

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  // $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() {
  var width = $(window).width();
  if (width > 767) {
    $('.footer__navigation-block').removeClass('is-active');
  } else {
    $('.footer__navigation-block:nth-child(2)').addClass('is-active');
  }
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function footerToggle(){
  var wrapper = $('.footer__navigation');
  var title = wrapper.find('.footer__navigation-title');

  if ($(window).width() < 767) {
    $('.footer__navigation-block:nth-child(2)').addClass('is-active');
  }

  title.each(function(){
    var _this = $(this);
    _this.on('click', function(){
      var width = $(window).width();
      if (width <= 767 && _this.parent().hasClass('is-active')) {
        _this.parent().removeClass('is-active');
      } else if (width <= 767 && !_this.parent().hasClass('is-active')) {
        _this.parent().addClass('is-active');
      }
    });
  });

}

function headerCatalog(){
  var btn = $('.header__catalog-btn');
  var shadow = $('.header__shadow');
  var popup = $('.header__catalog-popup');

  btn.on('click', function(e){
    e.stopPropagation();
    $(this).parent().addClass('is-active');
    shadow.addClass('is-active');
  });

  $(document).on('click', function(){
    if (btn.parent().hasClass('is-active') && shadow.hasClass('is-active')) {
      btn.parent().removeClass('is-active');
      shadow.removeClass('is-active');
    }
  });

  popup.on('click', function(e){
    e.stopPropagation();
  });
}

function headerLinks(){
  var li = $('.header__links-li');
  var shadow = $('.header__shadow');
  var popup = li.find('.header__links-popup');

  li.each(function(){
    var _this = $(this);
    var a = _this.find('.header__links-a--has-popup');

    a.on('click', function(e){
      e.stopPropagation();
      _this.addClass('is-active');
      shadow.addClass('is-active');
    });
  });

  $(document).on('click', function(){
    if (li.hasClass('is-active') && shadow.hasClass('is-active')) {
      li.removeClass('is-active');
      shadow.removeClass('is-active');
    }
  });

  popup.on('click', function(e){
    e.stopPropagation();
  });
}

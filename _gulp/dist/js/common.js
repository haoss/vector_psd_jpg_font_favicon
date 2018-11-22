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
    midClick: true,
    showCloseBtn: false,
    callbacks: {
      open: function(){
        var ta = document.querySelector('textarea.autosize');
        autosize(ta);
        var evt = document.createEvent('Event');
        evt.initEvent('autosize:update', true, false);
        ta.dispatchEvent(evt);
      }
    }
  });
  $('.popup__close').on('click', function(){
    $.magnificPopup.close();
  });

  $('.popup__image__show').on('click', function(e){
    e.preventDefault();
    $.magnificPopup.close();
    var _this = $(this);
    setTimeout(function(){
      $.magnificPopup.open({
        items: {
          titleSrc: _this.attr('title'),
          src: _this.attr('href'),
          type: 'image'
        },
        closeOnContentClick: true,
        mainClass: 'mfp-img-gallery',
        image: {
          verticalFit: true
        }
      })
    }, 500)

  });

  footerToggle();
  headerCatalog();
  headerLinks();

  $('.main-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    // fade: true,
    autoplay: true,
    // autoplaySpeed: 4000,
    // speed: 1000
  });

  $('select.selectric').selectric({
    inheritOriginalWidth: false
  });
  autosize($('textarea.autosize'));
  faq();
  productToCartTable();

  $('.product-table__datatables').each(function(){
    $(this).DataTable({
      "info": false,
      "paging": false,
      "searching": false,
      "order": [[ 0, "desc" ]]
    });
  });

  $('.map__carousel-wrapper').slick({
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 14,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: false,
    draggable: false,
    arrows: true,
    prevArrow: ".map__carousel-prev",
    nextArrow: ".map__carousel-next",
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 9
        }
      }
    ]
  });
  mapCarousel();
  cartCount();
  filterHasHide();
  catalogFilter();
  catalogFilterChange();
  mobileFilter();
  tableOrders();
  catalogMenuNumber();
  uploadImageProfile();
  tableSearch();

  $('ol.list li').each(function(){
    $(this).prepend('<span class="span">' + ($(this).index() + 1) + '</span>');
  });

  filterBlockHide();
  headerFixed();
  tableSearchBrandPopup();
  tableSearchBrandCheckTest();

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

$(window).on('scroll', function() {
  headerFixed();
});
$(window).on('resize', function() {
  var width = $(window).width();
  if (width > 767) {
    $('.footer__navigation-block').removeClass('is-active');
  } else {
    $('.footer__navigation-block:nth-child(2)').addClass('is-active');
  }

  filterHasHide();
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

function faq(){
  var faqBlock = '.faq__block',
      faqBlockAnswer = $('.faq__block-answer'),
      faqBlockTitle = $('.faq__block-title');

  $(faqBlock).each(function(){
    var _this = $(this);
    if (_this.hasClass('is-active')) {
      _this.find('.faq__block-answer').show();
    }
  });

  faqBlockTitle.on('click', function(e){
    e.preventDefault();
    var _this = $(this);

    if (!_this.parents(faqBlock).hasClass('is-active')) {
      _this.parents(faqBlock).addClass('is-active');
      _this.next(faqBlockAnswer).slideDown();
    } else {
      _this.parents(faqBlock).removeClass('is-active');
      _this.next(faqBlockAnswer).slideUp();
    }
  });
}

function productToCartTable(){
  var a = $('.product-table__to-cart');
  a.each(function(){
    var _this = $(this);
    _this.on('click', function(e){
      e.preventDefault();
      _this.toggleClass('is-active');
    });
  });
}

function mapCarousel() {
  var carousel = $('.map__carousel');
  var block = carousel.find('.map__carousel-block');

  block.first().addClass('is-active');
  block.each(function(){
    var _this = $(this);
    _this.on('click', function(){
      block.removeClass('is-active');
      _this.addClass('is-active');
    })
  })
}

function cartCount(){
  var counts = $('.cart__count');

  counts.each(function(index, value){
    var _this = $(this);
    var countUp = _this.find('.cart__count__div--up');
    var countDown = _this.find('.cart__count__div--down');

    var input = _this.find('input');
    var val = parseInt(input.val());

    countUp.on('click', function(){
      input.val(++val)
    });
    countDown.on('click', function(){
      input.val(--val)
    });
  });

  // console.log(counts);
}

function filterHasHide(){
  $('.filter__block .has-hide').readmore({
    speed: 500,
    collapsedHeight: 90,
    moreLink: '<div class="filter__more"><a href="#!">Показать все</a></div>',
    lessLink: '<div class="filter__more"><a href="#!">Скрыть лишнее</a></div>'
  });
}

function catalogFilter(){

  if ($("#filter__range").length <= 0) return;

  // Jquery UI slider
  $("#filter__range").slider({
  	min: 0,
  	max: 12000,
  	values: [1500,8700],
  	range: true,
  	stop: function(event, ui) {
      $("input#priceMin").val($("#filter__range").slider("values",0));
      $("input#priceMax").val($("#filter__range").slider("values",1));

      $('.price-range-min.value').html($("#filter__range").slider("values",0));
      $('.price-range-max.value').html($("#filter__range").slider("values",1));
    },
    slide: function(event, ui){
      $("input#priceMin").val($("#filter__range").slider("values",0));
      $("input#priceMax").val($("#filter__range").slider("values",1));

      $('.price-range-min.value').html($("#filter__range").slider("values",0));
      $('.price-range-max.value').html($("#filter__range").slider("values",1));
    }
  });
}

function catalogFilterChange(){
  if ($("#filter__range").length <= 0) return;

  $("input#priceMin").on('change', function(){
  	var value1=$("input#priceMin").val();
  	var value2=$("input#priceMax").val();
    if(parseInt(value1) > parseInt(value2)){
  		value1 = value2;
  		$("input#priceMin").val(value1);
      $('.price-range-min.value').html(value1);
  	}
  	$("#filter__range").slider("values", 0, value1);
    $('.price-range-min.value').html(value1);
  });

  $("input#priceMax").on('change', function(){
  	var value1=$("input#priceMin").val();
  	var value2=$("input#priceMax").val();
  	if (value2 > 12000) { value2 = 12000; $("input#priceMax").val(8700)}
  	if(parseInt(value1) > parseInt(value2)){
  		value2 = value1;
  		$("input#priceMax").val(value2);
      $('.price-range-max.value').html(value2);
  	}
  	$("#filter__range").slider("values",1,value2);
    $('.price-range-max.value').html(value2);
  });

  // фильтрация ввода в поля
  $('.filter__block input').on('keypress', function(event){
    var key, keyChar;
    if(!event) var event = window.event;
    if (event.keyCode) key = event.keyCode;
    else if(event.which) key = event.which;
    if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
    keyChar=String.fromCharCode(key);
    if(!/\d/.test(keyChar))	return false;
  });
}

function mobileFilter(){
  var btn = $('.catalog__mobile-btn');
  var filter = $('#filters');
  btn.on('click', function(e){
    e.stopPropagation();
    if (filter.hasClass('is-active')) {
      filter.removeClass('is-active');
    } else {
      filter.addClass('is-active');
    }
  });
}

function tableOrders(){
  var links = $('.product-table__title a');

  links.each(function(){
    var _this = $(this);
    _this.on('click', function(e){
      e.preventDefault();

      if (_this.parents('.product-table__row').hasClass('is-toggle')) {
        _this.parents('.product-table__row').removeClass('is-toggle');
        _this.removeClass('product-table__roll-down').addClass('product-table__roll-up').text('Свернуть')
      } else {
        _this.parents('.product-table__row').addClass('is-toggle');
        _this.removeClass('product-table__roll-up').addClass('product-table__roll-down').text('Развернуть')
      }
    })
  })
}

function catalogMenuNumber(){
  var catalog = $('.header__catalog-popup-wrapper');
  var block = catalog.find('.header__catalog-info strong');
  var a = catalog.find('.header__catalog-body a');

  block.text(a.eq(0).data('number'));

  a.each(function(){
    var _this = $(this);
    _this.on('hover', function(){
      block.text(_this.data('number'));
    });
  });
}

function uploadImageProfile() {
  var readURL = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.settings__picture').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".settings__file-upload").on('change', function(){
    readURL(this);
  });
  $(".settings__image-div").on('click', function() {
     $(".settings__file-upload").click();
  });
  $(".settings__file-link").on('click', function() {
     $(".settings__file-upload").click();
  });
}

function tableSearch(){
  var row = $('.product-table--search .product-table__row');

  row.each(function(){
    var _this = $(this);
    var footer = _this.find('tfoot');
    var btn = footer.find('a');

    btn.on('click', function(e){
      e.preventDefault();
      _this.toggleClass('is-toggle');
      footer.hide();
    });
  });
}

function filterBlockHide(){
  var body = $('#filters');
  var block = body.find('.filter__block');

  block.each(function(){
    var _this = $(this);
    var head = _this.find('.filter__head');

    head.on('click', function(){
      _this.toggleClass('is-active')
    });
  });
}

function headerFixed() {
  var header = $('.header');
  var body = $('body');

  if (!header) return;

  if ($(window).scrollTop() > header.height()) {
    header.addClass('is-fixed');
    body.addClass('is-scroll');
  } if ($(window).scrollTop() < header.height()) {
    header.removeClass('is-fixed');
    body.removeClass('is-scroll');
  }
}

function tableSearchBrandPopup() {
  var label = $('.product-table-new__div1-label');
  var form = $('.product-table-new__form');

  label.each(function(){
    var _this = $(this);
    _this.on('click', function(e){
      e.stopPropagation();
      _this.parent().toggleClass('is-active')
    });
  });

  form.on('click', function(e){
    e.stopPropagation();
  })

  $(document).on('click', function(){
    if (label.parent().hasClass('is-active')) {
      label.parent().removeClass('is-active')
    }
  });
}

function tableSearchBrandCheckTest() {
  var checkbox = $('.product-table-new__form-check');
  checkbox.each(function(){
    var _this = $(this);
    _this.parent().on('click', function(){
      _this.parent().toggleClass('is-active');
    });
  })
}

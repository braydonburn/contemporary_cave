//On page open, show spinner until page is loaded, then execute fadeOut transition
var $document = $(document),
  element = $('.onLoad'),
  fadeOut = 'fadeOut';
  $element = $('.navbar'),
  navbarDefault = 'indigo',
  navbarTransparent = 'smooth-scrolling',
  shadow = 'z-depth-2',
  fadeInDown = 'fadeInDown';


var overlay = document.getElementById('overlay');
window.addEventListener('load', function() {
  element.addClass(fadeOut);
  window.setTimeout("overlay.style.display = 'none';", 300);
})

// If user scrolls, change transparent nav to coloured
$document.scroll(function() {
  //Every time user scrolls retrieve screen height to avoid resizing errors.
  var height = window.screen.height - 100;
  if ($document.scrollTop() >= height) {
    //user scrolled more than 100 pixels
    $element.addClass(navbarDefault);
    $element.removeClass(navbarTransparent);

    $element.addClass(fadeInDown);
  } else {
    $element.addClass(navbarTransparent);
    $element.addClass(shadow);
    $element.removeClass(navbarDefault);

    $element.removeClass(fadeInDown);
  }
});

//When card is hovered over execute rotate.
$().ready(function() {
  $('[rel="tooltip"]').tooltip();

});

function rotateCard(btn) {
  var $card = $(btn).closest('.card-container');
  console.log($card);
  if ($card.hasClass('hover')) {
    $card.removeClass('hover');
  } else {
    $card.addClass('hover');
  }
}

//Execute fadeIn animation when the element is scrolled into view.
var animateHTML = function () {
  var elems,
    windowHeight
  var init = function () {
    elems = document.getElementsByClassName('hidden')
    windowHeight = window.innerHeight
    _addEventHandlers()
  }
  var _addEventHandlers = function () {
    window.addEventListener('scroll', _checkPosition)
    window.addEventListener('resize', init)
  }
  var _checkPosition = function () {
    for (var i = 0; i < elems.length; i++) {
      var posFromTop = elems[i].getBoundingClientRect().top
      if (posFromTop - windowHeight <= 0) {
        elems[i].className = elems[i].className.replace('hidden', 'fadeIn')
      }
    }
  }
  return {
    init: init
  }
}
animateHTML().init()

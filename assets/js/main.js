//On page open, show spinner until page is loaded.
var $document = $(document),
  element = $('.onLoad'),
  fadeOut = 'fadeOut';

var overlay = document.getElementById('overlay');
window.addEventListener('load', function() {
  element.addClass(fadeOut);
  window.setTimeout("overlay.style.display = 'none';", 300);
})

// If user scrolls, change transparent nav to coloured
var $document = $(document),
  $element = $('.navbar'),
  navbarDefault = 'indigo';
navbarTransparent = 'smooth-scrolling';

fadeInDown = 'fadeInDown';

$document.scroll(function() {
  if ($document.scrollTop() >= 100) {
    //user scrolled more than 100 pixels
    $element.addClass(navbarDefault);
    $element.removeClass(navbarTransparent);

    $element.addClass(fadeInDown);
  } else {
    $element.addClass(navbarTransparent);
    $element.removeClass(navbarDefault);

    $element.removeClass(fadeInDown);
  }
});

//On page open, show spinner until page is loaded.
var $document = $(document),
  element = $('.onLoad'),
  fadeOut = 'fadeOut';

function animationsTest(callback) {
  // Test if ANY/ALL page animations are currently active
  var testAnimationInterval = setInterval(function() {
  }, 25);
};

var overlay = document.getElementById('overlay');
window.addEventListener('load', function() {
  element.addClass(fadeOut);
  animationsTest(function() {
    overlay.style.display = 'none';
  })
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

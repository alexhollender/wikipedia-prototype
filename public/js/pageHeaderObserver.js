// this file observes whether or not the scroll position
// is below the page header, and if it is it shows
// the sticky header (only if logged-in)
// and manages associated elements

// show/hide sticky sticky header & sticky toc button
var pageHeaderObserver = new IntersectionObserver(function(element) {
  // if page header is visible
  if (element[0].isIntersecting === true) {
    // remove sticky header
    $('#grid').removeClass('below-page-header')
    // move personal tools menu to site header
    $('#personal-tools').append($('#personal-tools-menu'))
    // move language menu to site header
    $('#page-header').append($('#language-menu'))
    $('#language-menu button').addClass('flush-right')
    // $('#grid').removeClass('float-toc');
  } else {
    // show sticky header
    $('#grid').addClass('below-page-header')
    // move personal tools menu to sticky header
    $('#personal-tools-sticky').append($('#personal-tools-menu'))
    // move language menu to sticky header
    $('#language-menu-sticky').append($('#language-menu'))
    $('#language-menu button').removeClass('flush-right')
    // $('#grid').addClass('float-toc');
  }
});

$(document).ready(function() {
  pageHeaderObserver.observe(document.querySelector('#page-header'))
});

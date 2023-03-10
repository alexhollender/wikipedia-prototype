// this file handles all dropdown menu interactions
// (mainly opening and closing menus)

// open/close menus
const toggleMenu = (e) => {
  // get the specific menu
  const $thisMenu = $(e.currentTarget).siblings('.menu')
  // if it's already showing, hide it
  if ($thisMenu.hasClass('show')) {
    $thisMenu.removeClass('show')
  // otherwise, hide all other menus and show it
  } else {
    $('.menu').removeClass('show');
    $thisMenu.addClass('show');
    // in case search is open
    $('#search').removeClass('has-results');
  }
  // if it's the language switcher, focus the field
  // *currently the language menu is missing its search field
  // *it needs to be added back in
  if ($(e.currentTarget).hasClass('language-button')) {
    $('#language-search input').focus();
  }
}

// add open/close function to all menu handles
const menuHandles = $('.menu-handle');
for (const element of menuHandles) {
  element.addEventListener('click', toggleMenu)
}

// close all menus when clicking outside
$(document).on('click', 'body', () => {
  $('.menu').removeClass('show');
});

// prevent clicking on menu triggers from closing menus
$('body').on('click', '.language-button, .menu-handle, .list-heading, #toc-button, .user-menu-button, .parent span', function(e){
  e.stopPropagation();
});

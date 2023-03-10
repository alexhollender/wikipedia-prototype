// this file switches the logged-in and logged-out states
// currently if you are logged-in the Page tools menu is pinned by default
// but that behavior, and any other, can be customized below
// *the visibility of many elements is controlled by whether or not
// there is a 'logged-in' class on the #grid element

// switch logged-in logged-out state
const handleLogInOut = () => {
  if ($('#grid').hasClass('logged-in')) {
    $('#grid').removeClass('pin-page-tools pin-main-menu')
    $('#page-tools, #main-menu').removeClass('is-pinned')
  } else {
    $('#grid').addClass('pin-page-tools')
    $('#page-tools').addClass('is-pinned')
  }
  $('#grid').toggleClass('logged-in')
}

// check if the 'logged-in' class is present on the #grid
// element when the site loads
function checkLoggedIn() {
  if ($('#grid').hasClass('logged-in')) {
    $('#grid').addClass('pin-page-tools')
    $('#page-tools').addClass('is-pinned')
  } else {
    console.log('not logged in')
  }
}

$(document).ready(function() {
  checkLoggedIn();
});

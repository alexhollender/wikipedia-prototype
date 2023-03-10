// this file handles showing a modal that appears
// when first loading the prototype
// the modal can be used to give people context on what the prototype is showing
// and what kinds of feedback is being requested

// *currently the modal is commented out in index.html

// check if they have already visited the prototype
// if not, show the modal
const checkShowModal = () => {
  // if they have not visited yet show modal
  if (!sessionStorage.visited) {
    $('#modal-bg').css('display', 'flex');
    sessionStorage.setItem('visited', true);
  }
}

// close modal
const closeModal = () => {
  $('#modal-bg').hide();
}

$(document).ready(function() {
  checkShowModal();
});

// this file observes which section is currently in view
// and updates the corresponding element in the table of contents

// update toc styling
const config = {
  rootMargin: '0px 0px -85%',
  threshold: 0
};

let sectionObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $('#contents-list a').removeClass('active')
      if (entry.target.id === 'page-title') {
        $('#contents-list a[href="#"]').addClass('active')
      } else {
        let currentSection = entry.target.id
        let currElem = $(`#contents-list a[href="#${currentSection}"]`)
        $(currElem).addClass('active')
      }
    }
  })
}, config)

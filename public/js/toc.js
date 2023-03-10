// this file handles getting and displaying the table of contents
// the table of contents comes from the MediaWiki API
// https://www.mediawiki.org/wiki/Special:ApiSandbox

// stores the sections of the curent page
let sections;
// stores the current section in view
var currentSection;
// stores the number of attempts printToc() has made
let tocErrorAttempts = 0;

// get section headings for a given article
function getSections(title) {
  $.getJSON(`https://${uiLang}.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${title}&redirects=1&prop=sections`,
    function(data) {
      console.log('getting sections...')
      sections = data.parse.sections
      printToc()
    });
}

// ========================================
// PRINT ToC
// ========================================

function appendToUl(toclevel, id, anchor, title, index) {
  // relevant
  const ulArray = $(`ul.toc-level-${toclevel}`)
  const lastUl = ulArray[ulArray.length-1]
  $(lastUl).append(`<li id="${id}"><a href="#${anchor}">${title}</a></li>`)
  // if has a following element, is a top level item, & the following element is a level deeper
  if (index !== sections.length-1 && toclevel == 1 && toclevel < sections[index+1].toclevel) {
    const newLi = $(lastUl)[0].lastElementChild;
    $(newLi).addClass('parent').prepend('<span></span>')
    $(newLi)[0].addEventListener('click', showChildren)
    $(newLi).children('span')[0].addEventListener('click', toggleTocSection)
  }
}

// print the ToC to the container
function printToc() {
  if (sections) {
    sections.forEach((element, index) => {
      // same level, up a level, or first item
      if (element.number == 1 || element.toclevel <= sections[index-1].toclevel) {
        appendToUl(element.toclevel, element.number, element.linkAnchor, element.line, index)
      // down a level (needs a new <ul>)
      } else {
        // find the relevant <li> & append a <ul>
        const ulArray = $(`ul.toc-level-${element.toclevel-1}`)
        lastUl = ulArray[ulArray.length-1]
        let lastLi = $(lastUl)[0].lastElementChild
        $(lastLi).append(`<ul class="toc-level-${element.toclevel}"></ul>`)
        appendToUl(element.toclevel, element.number, element.linkAnchor, element.line, index)
      }
    })
    // if there are less than 24 sections, expand all
    if (sections.length < 24) {
      $('#contents-list li.parent').addClass('show-children');
    }
  } else {
    // if sections aren't there yet retry the function up to 5 times
    tocErrorAttempts++;
    if (tocErrorAttempts < 5) {
      console.log(`toc did not load. Retry ${tocErrorAttempts}/5`);
      setTimeout(function(){
        printToc();
      }, 500);
    } else {
      window.alert('There was an error loading the table of contents. Please reload the page');
    }
  }
}

// ==============================
// ToC INTERACTIONS
// ==============================

// expand collapsed sections when clicking on toc top level item
const showChildren = (e) => {
  const $thisParent = $(e.currentTarget).closest('.parent')
  $thisParent.addClass('show-children')
}

// expand/collapse ToC sections
const arrowToggle = (element) => {
  event.stopPropagation();
  $(element).closest('li').toggleClass('show-children');
}

// scroll toc in header to current section (for long tocs)
function scrollToCurSection() {
  var elem = document.querySelector(`#toc-outer #table-of-contents li a[href="#${currentSection}"]`);
  var elemRect = elem.getBoundingClientRect();
  // if section link is below the fold
  if (elemRect.top > 728) {
    // if element is closer to the top of the ToC
    document.getElementById('toc-outer').scrollTop = elemRect.bottom;
    // if element is closer to the bottom of the ToC
    // (add function here)
  // if section link is above the fold
  } else if (elemRect.top < 5) {

  }
}

// open/close menus
const toggleTocSection = (e) => {
  event.stopPropagation();
  const elem = $(e.currentTarget).closest('.parent')[0]
  $(elem).toggleClass('show-children')
}

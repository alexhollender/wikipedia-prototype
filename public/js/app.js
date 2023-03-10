// this file gets the page title from the URL, then calls:
// - getPage, which gets the HTML from the restbase API (https://en.wikipedia.org/api/rest_v1/)
// - getSections (which is for the table of contents, and lives in toc.js)
// - getLanguageFromURL (which sets the language code, otherwise defaults to English, and lives in languages.js)
// - checkArticleOrTalk (which checks if you are on an article page or a talk page, and lives in articleOrTalk.js) 
// - sectionObserver (which tracks the active section to highlight it in the TOC, and lives in sectionObserver.js)
// - and appends the page title to the page titlebar and sticky header

// urlString
let urlString;
// page title
let pageTitle;

// get page title from URL
// then call getPage and getSections
function getPageTitleFromUrl() {
  urlString = window.location.pathname.substring(1)
  // if there is no title in URL reload with 'Moss'
  if (!urlString ) {
    window.location.href = window.location.href+'Moss'
  } else {
    let urlStringClean
    // get path after '/' & replace any '_' with spaces
    urlStringClean = window.location.pathname.substring(1).replace(/_/g, ' ');
    // cleanup URI encoded page names
    if (urlStringClean.includes('%')) {
      pageTitle = decodeURI(urlStringClean);
    } else {
      pageTitle = urlStringClean;
    }
    getPage(urlStringClean)
    getSections(urlStringClean)
    checkArticleOrTalk()
  }
};

// gets page HTML from restbase API
function getPage(title) {
  $.get(`https://${uiLang}.wikipedia.org/api/rest_v1/page/html/${title}`, function(data) {
    console.log('getting page...');
    $('#page-content').append(data);
    // add the page heading
    $('#page-title, #page-title-sticky').html(pageTitle);
    // reset the <base> URL
    $('base').attr('href','');
    // must wait for page to be rendered before observing sections
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((section) => {
     sectionObserver.observe(section);
    });
  });
};

$(document).ready(function() {
  getLanguageFromURL();
  getPageTitleFromUrl();
});

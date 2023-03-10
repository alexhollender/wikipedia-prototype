// this file handles typeahead search
// search results come from the MediaWiki API
// https://www.mediawiki.org/wiki/Special:ApiSandbox

// stores current search term
let searchTerm = '';
// stores page title, description, and images
let searchResultsDetailsSorted = [];
// stores which search component is currently active
var $searchComponent;
// stores which search results menu is currently active
var $searchResultsMenu = $('#search nav')

// ፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨ //
// getting, sorting, and printing search results //
// ፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨ //

// check if there is a search term, run openSearch
function checkValThenSearch(searchTerm) {
  if (searchTerm.length > 0) {
    openSearch(searchTerm);
  } else {
    $('#search').removeClass('has-results');
    $('#search .menu').removeClass('show');
  }
}

// Wikipedia API > Query (returns 10 results on a search term)
function openSearch(string) {
  console.log("openSearch is running");
  $.getJSON(`https://${uiLang}.wikipedia.org/w/api.php?format=json&origin=*&formatversion=2&action=query&prop=pageimages%7Cdescription&uselang=content&smaxage=300&maxage=300&generator=prefixsearch&pilicense=any&piprop=thumbnail&pithumbsize=160&gpssearch=${string}`, function(data) {
    var responseObject = Object.entries(data);
    sortResults(responseObject);
  });
};

// sorts results from search API call
function sortResults(object) {
  var searchResults = object[2][1].pages;
  var searchResultsDetails = [];
  searchResults.forEach(function(element) {
    var item = {
      title: element.title,
      description: element.description ? element.description : '',
      image: element.thumbnail ? element.thumbnail.source : '/img/placeholder-img.svg',
      index: element.index
    }
    searchResultsDetails.push(item);
  });
  searchResultsDetailsSorted = searchResultsDetails.sort(compareValues('index', 'asc'));
  printResults();
};

// Sort an array of objects (search results) by a given key
function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

// prints results from searchResults into the <ul>
function printResults(){
  $('#search').addClass('has-results');
  $('#search .menu').addClass('show');
  $('#page-results, #additional-search-options').html('');
	searchResultsDetailsSorted.forEach(function(element) {
  	$('#page-results').append(`
      <li class="flex search-result-item">
        <div class="thumbnail" style="background-image:url('${element.image}')"></div>
        <div class="title-description">
          <a class="title">${element.title}</a>
          <div class="description">${element.description}</div>
        </div>
      </li>
    `)
	});
  $('#additional-search-options').append(
    `<li class="flex"><a class="title"><img src="/img/articleSearch.svg"> Search for pages containing &nbsp;<b>${searchTerm}</b></a></li>`
  );
}

// ፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨ //
// search UX interactivity //
// ፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨፨ //

// keyboard support for search results list
var searchInput = document.querySelector('#search input');
// start item index at 1
var selectedItemIndex = 0;
// when a key is pressed
searchInput.addEventListener('keydown', function(e) {
  var key = e.keyCode;
  // if the down key is pressed
  if (key === 40) {
    // check if the item index is less than 12 (so it stops at end of list)
    if (selectedItemIndex < 10) {
      selectedItemIndex++;
      // add selected class to element
      $(`#page-results li:nth-child(${selectedItemIndex})`).addClass('selected');
      // remove selected class from previous element
      $(`#page-results li:nth-child(${selectedItemIndex - 1 })`).removeClass('selected');
      // get name of selected item
      var string = $(`#page-results li:nth-child(${selectedItemIndex}) .title`).html();
      // update input field
      $('#search input').val(string);
    }
    // if you reached the bottom of the list, start over
    else {
      selectedItemIndex = 1
      $(`#page-results li:nth-child(${selectedItemIndex})`).addClass('selected');
      $(`#page-results li:nth-child(10)`).removeClass('selected');
    }
  } else if (key === 38) {
    if (selectedItemIndex > 0) {
      e.preventDefault();
      $(`#page-results li:nth-child(${selectedItemIndex})`).removeClass('selected');
      $(`#page-results li:nth-child(${selectedItemIndex - 1 })`).addClass('selected');
      selectedItemIndex--;
      var string = $(`#page-results li:nth-child(${selectedItemIndex}) .title`).html();
      if (selectedItemIndex > 0) {
        $('#search input').val(string);
      }
    }
  } else if (key === 13) {
    var pageName = $('#search input').val().replace(/ /g,'_');
    location = `/${pageName}`;
  }
});

// clicking on the search button
const searchButtonClick = () => {
  // get value of first .title element and redirect there
  location = `/${$('.title').html().replace(/ /g,'_')}`;
}

$(document).ready(function() {

  // when input changes search Wikipedia
  $('#search input').on('input', () => {
    // set the search term
    searchTerm = $('#search input').val();
    checkValThenSearch(searchTerm);
	});


  // when search is focused
  $('#search input').on('focus', () => {
    // hide other menus
    $('.menu').removeClass('show');
    // if it already has text in it
    if (searchTerm.length > 0) {
      $('#search').addClass('has-results')
      $('#search .menu').addClass('show')
    }
  });

  // when clicking on a search result
	$(document).on('click', '.search-result-item', function() {
    // get value of first .title element and redirect there
    var pageName = $(this).find('.title').html().replace(/ /g,'_');
		location = `/${pageName}`;
  });

  // when clicking outside the search results list
  $(document).on('click', 'body', () => {
    $('#search').removeClass('has-results');
  });

  // for clicking on input when there is text already in it
  // (so it opens back up and doesn't close itself)
  $('body').on('click', '#search input', function(e){
    e.stopPropagation();
  });

});

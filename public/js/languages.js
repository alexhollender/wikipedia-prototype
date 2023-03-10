// this file updates the interface labels based on the given 
// language code in the URL parameter (the 2–3 letters after the ?)
// for example, to render the prototype in Spanish you would go to:
// https://vector-2022.web.app/Agua?es
// the avilable languages can be found in translatedStrings.js
// to add additional languages (or additional strings in existing languages)
// go to generateLanguageStrings.js

// default language is English (en)
let uiLang = 'en';

// get language code from URL, store in session storage, call setUiLanguage
function getLanguageFromURL() {
  const string = window.location.href;
  // if there is a language code
  if (string.split('?')[1]) {
    const langCode = string.split('?')[1];
    // store language code in session storage
    sessionStorage.setItem('language', langCode);
  }
  setUiLanguage();
}

// check if language code has already been stored in sessionStorage
function setUiLanguage() {
  // if there is a language code in session storage
  if (sessionStorage.getItem('language')) {
    uiLang = sessionStorage.getItem('language');
    updateUiStrings();
    // flip interface if language code is 'fa' or 'ar'
    if (uiLang === 'fa' || uiLang === 'ar') {
      $('html').addClass('rtl');
    }
  }
}

// update all strings in the interface
// *only elements with a 'data-string' attribute will get updated
// e.g. <a data-string="string-key">Link title</a>
function updateUiStrings() {
  for (const [key, value] of Object.entries(strings[uiLang])) {
    $(`[data-string="${key}"]`).html(value);
  }

  // manually replace placeholder text in search input
  var input = document.querySelectorAll('#search input');
  input.forEach(function(item) {
    item.placeholder = strings[uiLang]['searchsuggest-search'];
  });
}
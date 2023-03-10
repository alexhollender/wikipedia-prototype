// this file allows switching between Article and Talk, including:
// - toggling the underline between the Article and Talk tabs in the page toolbar
// - toggling a .talk class on the #grid element, which adjusts the icons that appear in the sticky header

// current article page title
let articlePageUrl;
// current talk page title
let talkPageUrl;

const checkArticleOrTalk = () => {
  // if page title doesn't include talk prefix (strings in translatedStrings.js)
  if (!pageTitle.includes(strings[uiLang].talk)) {
    console.log('on an article page')
    // create talk page link
    let talkPage = `${strings[uiLang].talk}:${urlString}`
    talkPageUrl = `${window.location.origin}/${talkPage}`
  // if page title includes talk prefix
  } else {
    console.log('on a talk page');
    // create article page link
    let articlePage = urlString.split(":").pop();
    articlePageUrl = `${window.location.origin}/${articlePage}`;
    // switch the active tab to Talk
    $('#article-tab').removeClass('active');
    $('#talk-tab').addClass('active');
    $('#grid').addClass('talk');
  }
}

// switch to Article page
const switchToArticle = () => {
  if (articlePageUrl) {
    location.href = articlePageUrl;
  }
}

// switch to Talk page
const switchToTalk = () => {
  if (talkPageUrl) {
    location.href = talkPageUrl;
  }
}

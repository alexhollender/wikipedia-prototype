// this file does not run as part of the website
// you must run it manually in a brower console in order to generate
// additional language strings, or strings in additional languages

// the strings currently used in the prototype are in the two
// variables below, stringKeys & stringKeys2 (the API only accepts 49 at a time,
// which is why they are split into two separate variables)
// if you want to add new strings, add them to stringKeys2
// to find out the name of the string key, go to Wikipedia with ?uselang=qqx
// e.g. https://en.wikipedia.org/wiki/Paris?uselang=qqx
// and locate the appropriate string key

// STEP 1
// copy & paste the below code into the browser console, then press enter

const stringKeys = 'aboutsite|betafeatures-toplink|citethispage-link|coll-print_export|contactpage|currentevents|cx-campaign-contributionsmenu-mytranslations|cx-campaign-contributionsmenu-myuploads|delete|edit|help|mainpage-description|move|mycontris|mypreferences|mytalk|nstab-main|pageinfo-toolboxlink|permalink|portal|printableversion|pt-createaccount|pt-login|pt-userlogout|purge|randompage|recentchanges|recentchangeslinked-toolbox|sandboxlink-portlet-label|searchbutton|searchsuggest-search|sitesupport|skin-view-history|skin-view-view|specialpages|talk|toc|toolbox|upload|vector-anon-user-menu-pages|vector-languages|vector-main-menu-label|vector-page-tools-actions-label|vector-page-tools-general-label|vector-pin-element-label|vector-toc-beginning|vector-toc-label|vector-unpin-element-label|visualeditor-ca-editsource'

const stringKeys2 = 'vector-2022-action-addsection|watch|whatlinkshere|wikibase-dataitem|wikibase-editlinkstitle|wikibase-otherprojects'

const translatedStrings = {};

const getStrings = async (keys, lang) => {
  var url = `https://${lang}.wikipedia.org/w/api.php`;
  var params = {
      format: "json",
      action: "query",
      meta: "allmessages",
      ammessages: keys,
      amlang: lang,
      origin: "*"
  };
  var resp = await fetch(url + '?' + new URLSearchParams(params));
  var json = await resp.json();
  var stringsArr = json.query.allmessages;
  for (const element of stringsArr) {
    translatedStrings[element.name] = element['*'];
  }
  console.log(translatedStrings);
}

// STEP 2
// change the language codes in the function calls below to your desired language code
// e.g. getStrings(stringKeys, 'ar') will return language strings in Arabic
// copy & paste the below function calls into the same browser console, then press enter

getStrings(stringKeys2, 'ar')
getStrings(stringKeys, 'ar')

// STEP 3
// the console will return two objects
// copy & pase the second object at the end of this document (or in a new document)

// STEP 4
// because some of the strings use variables, you have to manually replace them
// replace {{SITENAME}} with the language-specific version of 'Wikipedia'
// replace {{WBREPONAME}} with 'Wikidata'

// STEP 5
// the interface uses some strings that are not available via the API
// in these cases you have to manually add them
// the custom fields currently used are:
// username: "nombre_1993",
// wordmarkImg: '<img src="/img/logos/wordmark-uk.svg">',
// taglineImg: '<img src="/img/logos/tagline-uk.svg">',
// tagline: 'From Wikipedia, the Free Encyclopedia'

// STEP 6
// add the new object of strings (which should contain both string keys, and string values) 
// into the translatedStrings.js file
// if you are adding additional strings to an existing language,
// add them to the appropriate object within 'const strings'
// if you are adding strings of an additional language,
// create a new object within 'const strings', e.g. if you were adding Hungarian:
// hu: { }

// STEP 7 (only for new strings)
// if you are adding a string that was not previously in the interface
// you need to add a corresponding data-string attribute to the HTML element
// e.g., if you added a new element in the interface that you wanted to get translated
// you would add <a data-string="string-key">Link title</a>
// *to find out the string key you can load Wikipedia with ?uselang=qqx
// e.g. https://en.wikipedia.org/wiki/Paris?uselang=qqx
// this file manages the interactivity and states
// of pinable/hidable panels (e.g. toc, page tools, main menu)

// move panel between pinned/hidden state
const movePanel = (e) => {
  const $thisPanel = $(e.currentTarget).closest('.panel')
  $thisPanel.toggleClass('is-pinned')
  const panelName = $thisPanel.data('panel')
  $('#grid').toggleClass(`pin-${panelName}`)
  const $thisMenu = $(e.currentTarget).closest('.menu')
  $thisMenu.removeClass('show')
}

// add movePanel function to all pin-hide-panel-button elements
const pinHidePanelButtons = $('.pin-hide-panel-button');
for (const element of pinHidePanelButtons) {
  element.addEventListener('click', movePanel)
}

// panel menu with collapsible list

// toggle coallapsible list
const toggleCollapsibleList = (e) => {
  $(e.currentTarget).closest('.collapsible').toggleClass('is-collapsed');
}

// attach event to menu section headings
const collapsibleListHeadings = $('.collapsible .list-heading');
for (const element of collapsibleListHeadings) {
  element.addEventListener('click', toggleCollapsibleList)
}

// this file handles changing classes on the body element
// based on options selected in the options pannel
// the corresponding style changes for given options
// are in options.scss

// *currently the options panel is commented out in index.html

// toggle options pannel
const toggleOptionsPannel = () => {
  $('#open-options, #close-options, #options-form').toggle();
}

// RADIOS
// update body data attribute when radio inputs change
function handleRadio(e) {
  var target = $(e.target);
  document.body.setAttribute(`data-${target[0].name}`, target.val());
}

// attach event listener to radio inputs
const styleInputsRadio = $('#options input[type=radio]');
for (const element of styleInputsRadio) {
  element.addEventListener('click', handleRadio)
}

// CHECKBOXES
// update body data attribute when checkboxes change
function handleCheckbox(e) {
  var target = $(e.target);
  if (document.body.getAttribute(`data-${target[0].name}`) === 'on') {
    document.body.setAttribute(`data-${target[0].name}`, 'off');
  } else {
    document.body.setAttribute(`data-${target[0].name}`, 'on');
  }
}

// attach event listener to checkbox inputs
const styleInputsCheckboxes = $('#options input[type=checkbox]');
for (const element of styleInputsCheckboxes) {
  element.addEventListener('click', handleCheckbox)
}

// SELECT INPUTS
// update body data attribute when selects change
function handleSelect(e) {
  var target = $(e.target);
  document.body.setAttribute(`data-${target[0].name}`, target.val());
}

// attach event listener to select inputs
const selectOptions = $('#options select');
for (const element of selectOptions) {
  element.addEventListener('change', handleSelect)
}

// RANGE SLIDERS
// update body data attribute when range inputs change
function handleRangeChange(e) {
  const target = $(e.target);
  const elem = target[0].dataset.element;
  const property = target[0].name;
  const val = target[0].value
  $(`#${elem}`).css(property, `${val}px`)
  $(`#${property}-display`).text(`${val}px`)
}

// attach event listener to range inputs
const rangeSliders = $('#options input[type=range]');
for (const element of rangeSliders) {
  element.addEventListener('input', handleRangeChange)
}
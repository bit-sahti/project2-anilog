//Fomantic configuration

$('.ui.dropdown')
  .dropdown()
;

$('#search-select')
  .dropdown()
;

//DOM Manipulation
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const pageInput = document.getElementById('page')

previous.onclick = () => pageInput.value = Number(pageInput.value) - 1;

next.onclick = () => page.value = Number(pageInput.value) + 1;
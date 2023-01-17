function hideSelf() {
  let element = document.querySelector('.hide-self-button');
  
  element.addEventListener('click', () => {
    element.hidden = true;
  });
}
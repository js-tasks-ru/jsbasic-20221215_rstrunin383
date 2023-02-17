export default function promiseClick(button) {
  return new Promise(function(resolve) { 
    button.addEventListener('click', ev => {
      resolve(ev);
    }, {once: true});
  });
}

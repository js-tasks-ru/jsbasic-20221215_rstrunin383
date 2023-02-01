import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();

    this.elem.addEventListener('click', ev => {
      if (ev.target.closest('.modal__close')) this.close();
    });

    this.escListener = ev => {
      if (ev.code === 'Escape') this.close();
    }

    window.addEventListener('keydown', this.escListener);
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }

  selectModal(postfix) {
    return this.elem.querySelector(`.modal__${postfix}`);
  }

  setTitle(title) {
    this.selectModal('title').textContent = title;
  }

  setBody(node) {
    let body = this.selectModal('body');
    body.innerHTML = '';
    body.append(node);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  escKeydown(ev) {
    if (ev.code === 'Escape') this.close();
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
    window.removeEventListener('keydown', this.escListener, false);
  }
}

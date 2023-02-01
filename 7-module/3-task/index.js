import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;

    this.render();
    this.renderSpan();

    this._elem.addEventListener('click', ev => {
      if (ev.target.closest('.slider__thumb')) return;

      this._value = Math.round(ev.offsetX / (ev.target.clientWidth / (this._steps - 1)));

      this._elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this._value,
        bubbles: true
      }));

      this.selectSliderClass('value').innerHTML = this._value;
      
      this.selectSliderClass('steps').querySelector('.slider__step-active').classList.remove('slider__step-active');
      this.selectSliderClass('steps').querySelectorAll('span')[this._value].classList.add('slider__step-active');
    
      let offsetLeft = 100 * (this._value / (this._steps - 1));
      this.selectSliderClass('thumb').style.left = offsetLeft + '%';
      this.selectSliderClass('progress').style.width = (this._value == 0 ? 0 : offsetLeft) + '%';
    });
  }

  render() {
    this._elem = createElement(`
      <!--Корневой элемент слайдера-->
      <div class="slider">
      
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
      
        <!--Полоска слайдера-->
        <div class="slider__progress"></div>
      
        <!-- Шаги слайдера (вертикальные чёрточки) -->
        <div class="slider__steps">
          <!-- текущий выбранный шаг выделен этим классом -->
          <!-- количество span ... -->

        </div>
      </div>
    `);
  }

  selectSliderClass(postfix) {
    return this._elem.querySelector(`.slider__${postfix}`);
  }

  renderSpan() {
    for (let i = 0; i < this._steps; i++) {
      let tmp = createElement('<span></span>');

      if (i === 0) tmp.classList.add('slider__step-active');

      this.selectSliderClass('steps').appendChild(tmp);
    }
  }

  get elem() {
    return this._elem;
  }
}

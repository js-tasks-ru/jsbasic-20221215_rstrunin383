import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;

    this.render();
    this.renderSpan();

    this.addClickListeners();
    this.addDragListeners();
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

  addClickListeners() {
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

  addDragListeners() {
    let thumb = this.selectSliderClass('thumb');
    let progress = this.selectSliderClass('progress');

    thumb.addEventListener('pointerdown', () => {

      this._elem.classList.add('slider_dragging');
      thumb.addEventListener('pointerup', () => this._elem.classList.remove('slider_dragging'));

      window.addEventListener('pointermove', onMouseMove);
      window.onpointerup = () => {
        this._elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this._value,
          bubbles: true
        }));

        let offsetLeft = 100 * (this._value / (this._steps - 1));
        this.selectSliderClass('thumb').style.left = offsetLeft + '%';
        this.selectSliderClass('progress').style.width = (this._value == 0 ? 0 : offsetLeft) + '%';

        window.removeEventListener('pointermove', onMouseMove);
      };

      let self = this;
      // Обработчик события движения мыши
      function onMouseMove (event) {
        let left = event.clientX - self._elem.getBoundingClientRect().left;
        let leftRelative = left / self._elem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }
        
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        
        let leftPercents = leftRelative * 100;

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        self._value = Math.round(leftPercents / (100 / (self._steps - 1))) ;
        self.selectSliderClass('value').innerHTML = self._value;
      }
    });
  }

  get elem() {
    return this._elem;
  }
}

class Progress {
  constructor(circle, input) {
    this.circle = circle;
    this.radius = this.circle.r.baseVal.value;
    this.circumference = 2 * Math.PI * this.radius;

    this.value = Number(input.value);
    this.isHide = false;
    this.isAnimated = false;

    this.#setStrokeDasharray(this.circumference, this.circumference);
    this.setProgress(this.value);
  }

  #setStrokeDasharray(line, space) {
    this.circle.style.strokeDasharray = `${line} ${space}`;
  }

  setProgress(percent) {
    this.circle.style.strokeDashoffset = `${this.circumference * (1 - percent / 100)}`;
    this.value = percent;
  }

  setAnimated() {
    if (this.value === 100) {
      this.isAnimated? this.#setStrokeDasharray(this.circumference,this.circumference) : this.#setStrokeDasharray(50, 100);
    }
    this.circle.style.animation = this.isAnimated? ``: `spin 2s linear infinite`
    this.isAnimated = !this.isAnimated;
  }

  setHidden() {
    this.circle.parentElement.style.display = this.isHide? 'block':'none';
    this.isHide = !this.isHide
  }
}

const circle = document.querySelector(`.circular-progress__ring`);
const inputProgress = document.querySelector(`#control__percent`);
const inputAnimate = document.querySelector(`#control__animation`);
const inputHide = document.querySelector(`#control__hiding`);
const warningPopup = document.querySelector(`.warning`);

const progress = new Progress(circle, inputProgress);

inputProgress.addEventListener(`input`, (e) => {
  e.preventDefault();
  const value = Number(e.target.value);
  if (value > 100 || value < 0) {
    warningPopup.classList.remove(`hidden`);
  } else {
    warningPopup.classList.add(`hidden`);
    progress.setProgress(value)
  }
})

inputAnimate.addEventListener(`change`, () => {
  inputAnimate.classList.toggle(`switchOn`);
  progress.setAnimated()
})

inputHide.addEventListener(`change`, () => {
  inputHide.classList.toggle(`switchOn`);
  progress.setHidden()
})

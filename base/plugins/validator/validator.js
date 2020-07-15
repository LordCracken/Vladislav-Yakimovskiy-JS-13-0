class Validator {
  constructor({ selector,  pattern = {}, method }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(item => item.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', e => {
      this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
      if (this.error.size) e.preventDefault;
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') return false;
        return true;
      },

      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.id];

      if (method) method.every(item => validatorMethod[item[0](elem, this.pattern[item[1]])]);
    } else {
      console.warn(`Необходимо передать id полей ввода и методы проверки этих полей!`);
    }

    return true;
  }

  checkIt(event) {
    const target = event.target;

    this.isValid(target) ? this.showSuccess(target) : this.showError(target);
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) return;
    const errorDiv = document.createElement('div');
    errorDiv.textContent = `Ошибка в этом поле`;
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
    this.error.add(elem);
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) elem.nextElementSibling.remove();
    this.error.delete(elem);
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
    input.succes {
      border: 2px solid green;
    }
    input.error {
      border: 2px solid red;
    }
    `;
    document.head.appendChild(style);
  }

  setPattern() {
    if (!this.pattern.phone) this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    if (!this.pattern.email) this.pattern.email = /^\w+@\w+\.\w{2,}$/;
  }
}

const valid = new Validator({
  selector: '#myform',
  pattern: {
    phone: /^\+380\d{7}$/,
    zip: /\d{5,6}/
  },
  method: {
    'phone': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'email': [
      ['notEmpty'],
      ['pattern', 'email']
    ]
  }
});


class Accordion {
    rootElem: HTMLElement;
    buttonElem: HTMLButtonElement;
    contentElem: HTMLElement;
    isOpen: boolean;
    constructor(domNode: HTMLElement) {
        this.rootElem = domNode;
        this.buttonElem = this.rootElem.querySelector('button[aria-expanded]') as HTMLButtonElement;

        const controlsId = this.buttonElem.getAttribute('aria-controls') as string;
        this.contentElem = document.getElementById(controlsId) as HTMLElement;

        this.isOpen = this.buttonElem.getAttribute('aria-expanded') === 'true';
        this._setHeight(this.isOpen);
        this._setFocusable(this.isOpen);

        this.buttonElem.addEventListener('click', this.onButtonClick.bind(this));
  }

  onButtonClick() {
    this.toggle(!this.isOpen);
  }

  toggle(open: boolean) {
    if (open === this.isOpen) {
      return;
    }

    this.isOpen = open;

    this.buttonElem.setAttribute('aria-expanded', `${open}`);
    this.contentElem.setAttribute('aria-hidden', `${!open}`);
    this._setHeight(open);
    this._setFocusable(open);
  }
  
  _setHeight(open: boolean) {
    this.contentElem.style.maxHeight = open ? this.contentElem.scrollHeight + 'px' : '0';
  }
  
  _setFocusable(open: boolean) {
    const focusableElements = this.contentElem.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
      if (!open) {
        el.setAttribute('tabindex', '-1');
        console.log('close');
      } else {
        el.setAttribute('tabindex', '0');
        console.log('open');
      }
    });
  }

  open() {
    this.toggle(true);
  }

  close() {
    this.toggle(false);
  }
}

const accordions = document.querySelectorAll('.accordion-header');
accordions.forEach((accordionEl) => {
  new Accordion(accordionEl as HTMLElement);
});
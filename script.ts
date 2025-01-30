
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

        // add event listeners
        this.buttonElem.addEventListener('click', this.onButtonClick.bind(this));
  }

  onButtonClick() {
    this.toggle(!this.isOpen);
  }

  toggle(open: boolean) {
    // don't do anything if the open state doesn't change
    if (open === this.isOpen) {
      return;
    }

    // update the internal state
    this.isOpen = open;

    // handle DOM updates
    this.buttonElem.setAttribute('aria-expanded', `${open}`);
    if (open) {
      this.contentElem.removeAttribute('hidden');
    } else {
      this.contentElem.setAttribute('hidden', '');
    }
  }

  // Add public open and close methods for convenience
  open() {
    this.toggle(true);
  }

  close() {
    this.toggle(false);
  }
}

// init accordions
const accordions = document.querySelectorAll('.accordion-header');
accordions.forEach((accordionEl) => {
  new Accordion(accordionEl as HTMLElement);
});
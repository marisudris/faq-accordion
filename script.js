"use strict";
class Accordion {
    rootElem;
    buttonElem;
    contentElem;
    isOpen;
    constructor(domNode) {
        this.rootElem = domNode;
        this.buttonElem = this.rootElem.querySelector('button[aria-expanded]');
        const controlsId = this.buttonElem.getAttribute('aria-controls');
        this.contentElem = document.getElementById(controlsId);
        this.isOpen = this.buttonElem.getAttribute('aria-expanded') === 'true';
        this._setHeight(this.isOpen);
        // add event listeners
        this.buttonElem.addEventListener('click', this.onButtonClick.bind(this));
    }
    onButtonClick() {
        this.toggle(!this.isOpen);
    }
    toggle(open) {
        // don't do anything if the open state doesn't change
        if (open === this.isOpen) {
            return;
        }
        // update the internal state
        this.isOpen = open;
        // handle DOM updates
        this.buttonElem.setAttribute('aria-expanded', `${open}`);
        this.contentElem.setAttribute('aria-hidden', String(!open));
        this._setHeight(open);
    }
    _setHeight(open) {
        this.contentElem.style.maxHeight = open ? this.contentElem.scrollHeight + 'px' : '0';
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
    new Accordion(accordionEl);
});

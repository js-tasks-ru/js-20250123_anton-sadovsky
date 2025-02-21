export default class Tooltip {
  element;
  static instance;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  initialize () {
    this.createListeners();
  }

  handleDocumentPointerover = (e) => {
    const tooltip = e.target.dataset.tooltip;

    if (tooltip) {
      this.render(tooltip);
    }
  }
  
  handleDocumentPointerout = (e) => {
    const tooltip = e.target.dataset.tooltip;
    
    if (tooltip) {
      this.remove();
    }
  }

  handleDocumentMousemove = (e) => {
    const tooltip = e.target.dataset.tooltip;

    if (tooltip) {
      this.element.style.left = e.pageX + 8 + 'px';
      this.element.style.top = e.pageY + 12 + 'px';
    }
  }
  
  createListeners() {
    document.addEventListener('pointerover', this.handleDocumentPointerover);
    document.addEventListener('pointerout', this.handleDocumentPointerout);
    document.addEventListener('pointermove', this.handleDocumentMousemove);
  }

  destroyListeners() {
    document.removeEventListener('pointerover', this.handleDocumentPointerover);
    document.removeEventListener('pointerout', this.handleDocumentPointerout);
    document.removeEventListener('pointermove', this.handleDocumentMousemove);
  }

  render(text) {
    this.element = this.createTooltipElement(text);
    document.querySelector('body').append(this.element);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.destroyListeners();
  }

  createTooltipElement(text) {
    const template = `<div class="tooltip">${text}</div>`;

    const div = document.createElement('div');
    div.innerHTML = template;
    return div.firstElementChild;
  }

  createTemplate(text) {
    return `<div class="tooltip">${text}</div>`;
  }
}

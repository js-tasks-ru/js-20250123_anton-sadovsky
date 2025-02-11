export default class SortableTable {
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.element = this.createElement();
    this.selectSubElements();
  }

  createElement() {
    const div = document.createElement('div');
    div.innerHTML = this.createTemplate();
    return div.firstElementChild;
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }


  sort(field, type) {
    const header = this.headerConfig.find(t => t.id === field);

    if (!header.sortable) {
      return;
    }

    const m = type == 'asc' ? 1 : -1;

    this.data = this.data.sort((a, b) => {
      if (header.sortType === 'string') {
        return m * a[field].localeCompare(b[field], ['ru', 'en'], { caseFirst: 'upper' });
      }
      else {
        return m * (a[field] - b[field]);
      }
    });

    this.subElements.body.innerHTML = this.createBodyTemplate();
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }

  createTemplate() {
    return `
    <div class="sortable-table">
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.createHeaderTemplate()}
      </div>

      <div data-element="body" class="sortable-table__body">
        ${this.createBodyTemplate()}
      </div>

      <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

      <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
        <div>
          <p>No products satisfies your filter criteria</p>
          <button type="button" class="button-primary-outline">Reset all filters</button>
        </div>
      </div>
    </div>
    `;
  }

  createHeaderTemplate() {
    return this.headerConfig.map(hc => {
      return `
        <div class="sortable-table__cell" data-id="${hc.id}" data-sortable="${hc.sortable}">
          <span>${hc.title}</span>
        </div>
      `;
    }).join('');
  }

  createBodyTemplate() {
    return this.data.map(d => {
      return `
        <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
          ${this.headerConfig.map(hc => {
            if (hc.template) {
              return hc.template([d]);
            }
            else {
              return `<div class="sortable-table__cell">${d[hc.id]}</div>`;
            }
          }).join('')}
        </a>
      `;
    }).join('');
  }
}


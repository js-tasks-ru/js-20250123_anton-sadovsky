import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js'


export default class SortableTable extends SortableTableV1 {
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    super(headersConfig, data);

    this.isSortLocally = true;
    this.createArrowElement();
    this.defaultSort(sorted);
    this.createListeners();
  }

  createArrowElement() {
    const blankElement = document.createElement('div');
    blankElement.innerHTML = this.createArrowTemplate();
    this.arrowElement = blankElement.firstElementChild;
  }

  defaultSort(sorted) {
    if (sorted) {
      const cellElement = this.subElements.header.querySelector(`[data-id='${sorted.id}']`);

      if (!cellElement) {
        return;
      }
      
      const sortField = cellElement.dataset.id;
      const sortOrder = sorted.order;
      
      cellElement.setAttribute('data-order', sortOrder);
      cellElement.append(this.arrowElement);

      this.sort(sortField, sortOrder);
    }
  }

  handleHeaderCellClick = (e) => {
    const cellElement = e.target.closest('.sortable-table__cell');

    if (!cellElement) {
     return;
    }
    
    const sortable = cellElement.getAttribute('data-sortable');

    if (sortable === 'false') {
      return;
    }

    const sortField = cellElement.dataset.id;
    let sortOrder = cellElement.dataset.order;
  
    if (sortOrder) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    }
    else {
      cellElement.setAttribute('data-order', 'desc');
    }

    cellElement.append(this.arrowElement);

    this.sort(sortField, sortOrder);
  }

  sort(sortField, sortOrder) {
    if (this.isSortLocally) { 
      this.sortOnClient(sortField, sortOrder);
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient(sortField, sortOrder) {
    super.sort(sortField, sortOrder);
  }

  sortOnServer() {
    // @TODO
  }

  createListeners() {
    this.subElements.header.addEventListener('pointerdown', this.handleHeaderCellClick);
  }

  destroyListeners() {
    this.subElements.header.removeEventListener('pointerdown', this.handleHeaderCellClick);
  }

  destroy() {
    super.destroy();
    this.destroyListeners();
  }

  createArrowTemplate() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `
  }
}

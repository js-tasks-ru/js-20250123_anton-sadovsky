export default class ColumnChart {
    element;
    chartHeight = 50;

    constructor({
      data = [],
      label = '',
      link = '',
      value = 0,
      formatHeading = value => value
    } = {}) {
      this.label = label;
      this.link = link;
      this.data = data;
      this.value = value;
      this.formatHeading = formatHeading;


      this.element = this.createTemplate();
    }

    getColumnProps() {
      const maxValue = Math.max(...this.data);
      const scale = 50 / maxValue;
      
      return this.data.map(item => {
        return {
          percent: (item / maxValue * 100).toFixed(0) + '%',
          value: String(Math.floor(item * scale))
        };
      });
    }

    update(newData) {
      this.data = newData;
      const bodyElement = document.querySelector('[data-element="body"]');
      bodyElement.innerHTML = this.createChartItemsTemplate();
    }

    remove() {
      this.element.remove();
    }

    destroy() {
      this.remove();
    }

    createChartLinkTemplate() {
      return this.link ? `<a href="${this.link}" class="column-chart__link">View all</a>` : '';
    }

    createChartItemsTemplate() {
      return this.getColumnProps()
                .map(data => `<div style="--value: ${data.value}" data-tooltip="${data.percent}"></div>`)
                .join('');
    }

    columnChartLoadingStyles() {
      return this.data.length ? '' : 'column-chart_loading';
    }

    createTemplate() {
      const template = `
        <div class="column-chart ${this.columnChartLoadingStyles()}" style="--chart-height: 50">
            <div class="column-chart__title">
                ${this.label}
                ${this.createChartLinkTemplate()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
                <div data-element="body" class="column-chart__chart">
                    ${this.createChartItemsTemplate()}
                </div>
            </div>
        </div>
        `;
      const newElement = document.createElement('div');
      newElement.innerHTML = template;
      return newElement.firstElementChild;
    }
}

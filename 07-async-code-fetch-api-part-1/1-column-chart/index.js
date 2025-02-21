import fetchJson from './utils/fetch-json.js';
import ColumnChartV1 from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart extends ColumnChartV1 {
  url;

  constructor({
    url = '',
    range = {},
    label = '',
    link = '',
    formatHeading = value => value
  } = {}) {
    super({ label, link, formatHeading });
    this.url = url;
    const { from, to } = range;
    this.fetchData(from, to);
  }

  createUrl(from, to) {
    const url = new URL(this.url, BACKEND_URL);
    url.searchParams.append('from', from);
    url.searchParams.append('to', to);
    return url;
  }

  async fetchData(from, to) {
    try {
      super.update([]);
      const response = await fetch(this.createUrl(from, to).href);
      const data = await response.json();
      super.update(Object.values(data));
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async update(from, to) {
    return await this.fetchData(from, to);
  }
}

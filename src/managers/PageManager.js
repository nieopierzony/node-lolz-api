'use strict';

const BaseManager = require('./BaseManager');
const Page = require('../structures/Page');

class PageManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, Page);
  }

  async fetch(id, cache = true, force = false) {
    if (!id) throw new TypeError('Необходимо указать ID страницы');
    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    const endpoint = this.client.api.endpoints.Pages.get(id);
    const data = await this.client.api.request('GET', endpoint);
    return this.add(data.page, cache);
  }

  async fetchAll(options = {}, cache = true) {
    const endpoint = this.client.api.endpoints.Pages.getAll();
    const query = {
      parent_page_id:
        options.parentPage && options.parentPage instanceof Page ? options.parentPage.id : options.parentPage,
      order: options.order,
    };
    const data = await this.client.api.request('GET', endpoint, { query });
    return { pages: data.pages.map(page => this.add(page, cache)), totalCount: data.pages_total };
  }
}

module.exports = PageManager;

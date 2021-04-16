'use strict';

const BaseManager = require('./BaseManager');
const Tag = require('../structures/Tag');

class TagManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, Tag);
  }

  async find(startsWith) {
    const endpoint = this.client.api.endpoints.Tags.find();
    const data = await this.client.api.request('GET', endpoint, { query: { tag: startsWith }, querySuffix: '&' });
    return Object.fromEntries(data.tags.map((tag, i) => [data.ids[i], tag]));
  }

  async getPopular() {
    const endpoint = this.client.api.endpoints.Tags.getPopular();
    const data = await this.client.api.request('GET', endpoint);
    return data.tags;
  }

  async fetchAll() {
    // TODO: В документации не указана информация о query, проверить
    const endpoint = this.client.api.endpoints.Tags.getAll();
    const data = await this.client.api.request('GET', endpoint);
    return { tags: data.tags, totalCount: data.tags_count, links: data.links };
  }

  async fetch(id, options = {}, cache = true, force = false) {
    if (!id) throw new TypeError('Необходимо указать ID тега');
    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }
    const endpoint = this.client.api.endpoints.Tags.get(id);
    const data = await this.client.api.request('GET', endpoint, {
      query: { page: options.page, limit: options.limit },
    });
    return this.add({ ...data.tag, tagged: data.tagged, taggedTotal: data.dagged_total, links: data.links }, cache);
  }
}

module.exports = TagManager;

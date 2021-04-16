'use strict';

const BaseManager = require('./BaseManager');
const Category = require('../structures/Category');
const Forum = require('../structures/Forum');

class CategoryManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, Category);
  }

  async fetch(id, cache = true, force = false) {
    if (!id) throw new TypeError('Необходимо указать ID категории');
    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    const endpoint = this.client.api.endpoints.Categories.get(id);
    const data = await this.client.api.request('GET', endpoint);
    return this.add(data.category, cache);
  }

  async fetchAll(options = {}, cache = true) {
    const endpoint = this.client.api.endpoints.Categories.getAll();
    const query = {
      parent_category_id:
        options.parentCategory && options.parentCategory instanceof Category
          ? options.parentCategory.id
          : options.parentCategory,
      parent_forum_id:
        options.parentForum && options.parentForum instanceof Forum ? options.parentForum.id : options.parentForum,
      order: options.order,
    };
    const data = await this.client.api.request('GET', endpoint, { query });
    // TODO: Везде сделать одни названия для тотального количества
    return { categories: data.categories.map(cat => this.add(cat, cache)), totalCount: data.categories_total };
  }
}

module.exports = CategoryManager;

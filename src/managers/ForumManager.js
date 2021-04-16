'use strict';

const BaseManager = require('./BaseManager');
const Category = require('../structures/Category');
const Forum = require('../structures/Forum');

class ForumManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, Forum);
  }

  async getFollowers(id, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID форума');
    const endpoint = this.client.api.endpoints.Forums.getFollowers(id);
    const data = await this.client.api.request('GET', endpoint);
    return data.users.map(user => this.client.users.add(user, cache));
  }

  async follow(id, options = {}, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID форума');
    const endpoint = this.client.api.endpoints.Forums.follow(id);
    const query = {
      post: options.post ? 1 : 0,
      alert: options.alert ? 1 : 0,
      email: options.email ? 1 : 0,
    };
    await this.client.api.request('POST', endpoint, { query });
    return this.fetch(id, cache);
  }

  async unfollow(id, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID форума');
    const endpoint = this.client.api.endpoints.Forums.unfollow(id);
    await this.client.api.request('DELETE', endpoint);
    return this.fetch(id, cache);
  }

  async fetch(id, cache = true, force = false) {
    if (!id) throw new TypeError('Необходимо указать ID форума');
    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    const endpoint = this.client.api.endpoints.Forums.get(id);
    const data = await this.client.api.request('GET', endpoint);
    return this.add(data.forum, cache);
  }

  async fetchAll(options = {}, cache = true) {
    const endpoint = this.client.api.endpoints.Forums.getAll();
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
    return { forums: data.forums.map(forum => this.add(forum, cache)), totalCount: data.forums_total };
  }
}

module.exports = ForumManager;

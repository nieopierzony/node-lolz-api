'use strict';

const BaseManager = require('./BaseManager');
const ProfilePost = require('../structures/ProfilePost');

class ProfilePostManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, ProfilePost);
  }

  async fetchUserPosts(userID, options = {}, cache = true) {
    if (!userID) throw new TypeError('Необходимо указать ID пользователя');
    const endpoint = this.client.api.endpoints.ProfilePosts.getPosts(userID);
    const res = await this.client.api.request('GET', endpoint, { query: { page: options.page, limit: options.limit } });
    if (res.user) {
      this.client.users.add(res.user);
    }
    return { links: res.links, postsCount: res.data_total, posts: res.data.map(post => this.add(post, cache)) };
  }

  async fetch(id, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID поста');
    const endpoint = this.client.api.endpoints.ProfilePosts.get(id);
    const res = await this.client.api.request('GET', endpoint);
    return this.add(res.profile_post, cache);
  }

  async create(userID, body, cache = true) {
    if (!userID) throw new TypeError('Необходимо указать ID пользователя');
    if (!body || typeof body !== 'string') throw new TypeError('Необходимо указать содержимое');
    const endpoint = this.client.api.endpoints.ProfilePosts.create(userID);
    const res = await this.client.api.request('POST', endpoint, { data: { post_body: body } });
    return this.add(res.profile_post, cache);
  }

  async delete(id) {
    if (!id) throw new TypeError('Необходимо указать ID поста');
    const endpoint = this.client.api.endpoints.ProfilePosts.delete(id);
    await this.client.api.request('DELETE', endpoint);
    return this;
  }

  async edit(id, body, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID поста');
    const endpoint = this.client.api.endpoints.ProfilePosts.edit(id);
    const res = await this.client.api.request('PUT', endpoint, { data: { post_body: body } });
    return this.add(res.profile_post, cache);
  }
}

module.exports = ProfilePostManager;

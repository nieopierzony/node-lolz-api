'use strict';

const BaseManager = require('./BaseManager');
const Forum = require('../structures/Forum');
const Post = require('../structures/Post');
const Thread = require('../structures/Thread');
const UserLike = require('../structures/UserLike');

class PostManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, Post);
  }

  async fetch(id, cache = true, force = false) {
    if (!id) throw new TypeError('Необходимо указать ID поста');
    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return false;
    }
    const endpoint = this.client.api.endpoints.Posts.get(id);
    const data = await this.client.api.request('GET', endpoint);
    return this.add(data.post, cache);
  }

  async fetchAll(options = {}, cache = true) {
    const query = {
      thread_id: options.thread instanceof Thread ? options.thread.id : options.thread,
      page: options.page,
      limit: options.limit,
      order: options.order,
      page_of_post_id: options.pageOfPostID,
    };
    const endpoint = this.client.api.Posts.getAll();
    const data = await this.client.api.request('GET', endpoint, { query });
    return {
      posts: data.posts.map(t => this.add(t, cache)),
      totalCount: data.posts_total,
      links: { pages: data.pages, next: data.next, prev: data.prev },
      thread: this.client.thread.add(data.thread),
    };
  }

  async create(thread, body, options = {}) {
    const threadID = thread instanceof Thread ? thread.id : typeof thread === 'number' ? thread : null;

    if (!thread) throw new TypeError('Необходимо указать тему');
    if (!body) throw new TypeError('Необходимо указать содержимое поста');

    const query = {
      thread_id: threadID,
      post_body: body,
      quote_post_id: options.quotePost instanceof Post ? options.quotePost.id : options.quotePost,
    };

    const endpoint = this.client.api.endpoints.Posts.create();
    const data = await this.client.api.request('POST', endpoint, { data: query });
    return this.add(data.post);
  }

  async edit(id, options = {}) {
    if (!id) throw new TypeError('Необходимо указать ID поста');
    const query = {
      post_body: options.body,
      thread_title: options.title,
      thread_prefix_id: options.prefixID,
      thread_tags: options.tags,
      thread_node_id: options.forum instanceof Forum ? options.forum.id : options.forum,
    };
    const endpoint = this.client.api.endpoints.Posts.edit(id);
    const data = await this.client.api.request('PUT', endpoint, { data: query });
    return this.add(data.post);
  }

  async delete(id, reason) {
    if (!id) throw new TypeError('Необходимо указать ID поста');
    const endpoint = this.client.api.endpoints.Posts.delete(id);
    await this.client.api.request('DELETE', endpoint, { query: { reason }, querySuffix: '&' });
    return this;
  }

  async getLikes(id, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID поста');
    const endpoint = this.client.api.endpoints.Posts.getLikes(id);
    const data = await this.client.api.request('GET', endpoint);
    data.users.forEach(user => this.client.users.add(user, cache));
    return data.users.map(user => new UserLike(this.client, user));
  }

  async follow(id, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID поста');
    const endpoint = this.client.api.endpoints.Posts.like(id);
    await this.client.api.request('POST', endpoint);
    return this.fetch(id, cache);
  }

  async unfollow(id, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID поста');
    const endpoint = this.client.api.endpoints.Posts.unlike(id);
    await this.client.api.request('DELETE', endpoint);
    return this.fetch(id, cache);
  }

  async report(id, message, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID поста');
    if (!message && typeof message !== 'string') throw new TypeError("Поле 'message' должно быть типа string");
    const endpoint = this.client.api.endpoints.Posts.report(this.id);
    await this.client.api.request('POST', endpoint, { data: { message } });
    return this.fetch(id, cache);
  }

  async getUnread(thread, cache = true) {
    const threadID = thread instanceof Thread ? thread.id : thread;
    const endpoint = this.client.api.endpoints.Posts.getUnread();
    const data = await this.client.request('GET', endpoint, { query: { thread_id: threadID } });
    return data.posts.map(t => this.add(t, cache));
  }
}

module.exports = PostManager;

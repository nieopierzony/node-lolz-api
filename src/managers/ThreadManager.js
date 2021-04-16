'use strict';

const BaseManager = require('./BaseManager');
const ThreadNavigationManager = require('./ThreadNavigationManager');
const Forum = require('../structures/Forum');
const Poll = require('../structures/Poll');
const Tag = require('../structures/Tag');
const Thread = require('../structures/Thread');
const User = require('../structures/User');
const UserFollower = require('../structures/UserFollower');

class ThreadManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, Thread);
  }

  // TODO: Добавить enum для order
  async fetchAll(options = {}, cache = true) {
    const query = {
      forum_id: options.forum instanceof Forum ? options.forum.id : options.forum,
      thread_ids: options.threadIDs,
      creator_user_id: options.creator instanceof User ? options.creator.id : options.creator,
      sticky: typeof options.isSticky === 'boolean' ? (options.isSticky ? 1 : 0) : null,
      thread_prefix_id: options.threadPrefixID,
      thread_tag_id: options.tag instanceof Tag ? options.tag.id : options.tag,
      page: options.page,
      limit: options.limit,
      order: options.order,
      thread_create_date:
        options.threadCreatedAt instanceof Date ? options.threadCreatedAt.getTime() / 1000 : options.threadCreatedAt,
      thread_update_date:
        options.threadUpdatedAt instanceof Date ? options.threadUpdatedAt.getTime() / 1000 : options.threadUpdatedAt,
    };

    const endpoint = this.client.api.Threads.getAll();
    const data = await this.client.api.request('GET', endpoint, { query });
    return {
      threads: data.threads.map(t => this.add(t, cache)),
      totalCount: data.threads_total,
      links: { pages: data.pages, next: data.next, prev: data.prev },
      forum: this.client.forums.add(data.forum),
      creator: this.client.users.add(data.creator_user),
      prefixes: data.thread_prefixes.map(p => ({
        groupTitle: p.group_title,
        prefixes: p.group_prefixes.map(pr => ({ id: pr.id, title: pr.title })),
        tag: this.client.tags.add(data.thread_tag),
      })),
    };
  }

  async fetch(id, cache = true, force = false) {
    if (!id) throw new TypeError('Необходимо указать ID темы');
    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return false;
    }
    const endpoint = this.client.api.endpoints.Threads.get(id);
    const data = await this.client.api.request('GET', endpoint);
    return this.add(data.thread, cache);
  }

  async edit(id, options = {}) {
    if (!id) throw new TypeError('Необходимо указать ID темы');
    const query = {
      post_body: options.body,
      thread_title: options.title,
      thread_prefix_id: options.prefixID,
      thread_tags: options.tags,
      thread_node_id: options.forum instanceof Forum ? options.forum.id : options.forum,
    };
    const endpoint = this.client.api.endpoints.Threads.edit(id);
    const data = await this.client.api.request('PUT', endpoint, { data: query });
    return this.add(data.thread);
  }

  async delete(id, reason) {
    if (!id) throw new TypeError('Необходимо указать ID темы');
    const endpoint = this.client.api.endpoints.Threads.delete(id);
    await this.client.api.request('DELETE', endpoint, { query: { reason }, querySuffix: '&' });
    return this;
  }

  async create(forum, title, body, options = {}) {
    const forumID = forum instanceof Forum ? forum.id : typeof forum === 'number' ? forum : null;

    if (!forum) throw new TypeError('Необходимо указать форум');
    if (!title) throw new TypeError('Необходимо указать заголовок');
    if (!body) throw new TypeError('Необходимо указать содержимое темы');

    // TODO: Как передавать список тегов?
    const query = {
      forum_id: forumID,
      thread_title: title,
      post_body: body,
      thread_prefix_id: options.prefixID,
      thread_tags: options.tags,
    };

    const endpoint = this.client.api.endpoints.Threads.create();
    const data = await this.client.api.request('POST', endpoint, { data: query });
    return this.add(data.thread);
  }

  async getFollowers(id, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID темы');
    const endpoint = this.client.api.endpoints.Threads.getFollowers(id);
    const data = await this.client.api.request('GET', endpoint);
    data.users.forEach(user => this.client.users.add(user, cache));
    return data.users.map(user => new UserFollower(this.client, user));
  }

  async follow(id, options = {}, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID темы');
    const endpoint = this.client.api.endpoints.Threads.follow(id);
    const query = { email: options.email ? 1 : 0 };
    await this.client.api.request('POST', endpoint, { query });
    return this.fetch(id, cache);
  }

  async unfollow(id, cache = true) {
    if (!id) throw new TypeError('Необходимо указать ID темы');
    const endpoint = this.client.api.endpoints.Threads.unfollow(id);
    await this.client.api.request('DELETE', endpoint);
    return this.fetch(id, cache);
  }

  getNavigation(id) {
    if (!id) throw new TypeError('Необходимо указать ID темы');
    const manager = new ThreadNavigationManager(this.client, id);
    return manager.fetchAll();
  }

  async getPoll(id) {
    if (!id) throw new TypeError('Необходимо указать ID темы');
    const endpoint = this.client.api.endpoints.Threads.Poll.get(id);
    const data = await this.client.api.request('GET', endpoint);
    return new Poll(this.client, data.poll, id);
  }

  async votePoll(id, responseID) {
    if (!id) throw new TypeError('Необходимо указать ID темы');
    if (!responseID || !responseID.length) throw new TypeError('Необходимо указать ID ответа');
    const endpoint = this.client.api.endpoints.Threads.Poll.vote(id);
    await this.client.api.request('POST', endpoint, {
      data: {
        response_id: typeof responseID === 'number' ? responseID : null,
        reponse_ids: typeof responseID === 'object' ? responseID : null,
      },
    });
    return this.getPoll(id);
  }

  async getUnread(options = {}, cache = true) {
    const query = {
      limit: options.limit,
      forum_id: options.forum instanceof Forum ? options.forum.id : options.forum,
      data_limit: options.data_limit,
    };
    const endpoint = this.client.api.endpoints.Threads.getUnread();
    const data = await this.client.request('GET', endpoint, { query });
    return data.data.map(t => this.add(t, cache));
  }

  async getRecent(options = {}, cache = true) {
    const query = {
      limit: options.limit,
      forum_id: options.forum instanceof Forum ? options.forum.id : options.forum,
      data_limit: options.data_limit,
      days: options.days,
    };
    const endpoint = this.client.api.endpoints.Threads.getRecent();
    const data = await this.client.request('GET', endpoint, { query });
    return data.data.map(t => this.add(t, cache));
  }
}

module.exports = ThreadManager;

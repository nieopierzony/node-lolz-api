'use strict';

const FollowedForum = require('./FollowedForum');
const FollowedThread = require('./FollowedThread');
const User = require('./User');

class ClientUser extends User {
  async getFollowedForums(cache = true) {
    const endpoint = this.client.api.endpoints.Forums.getFollowed();
    const data = await this.client.api.request('GET', endpoint);
    data.forums.forEach(forum => this.client.forums.add(forum, cache));
    return data.forums.map(forum => new FollowedForum(this.client, forum));
  }

  followForum(id, options, cache) {
    return this.client.forums.follow(id, options, cache);
  }

  unfollowForum(id, cache) {
    return this.client.forums.unfollow(id, cache);
  }

  async getIgnored(onlyCount = false) {
    const endpoint = this.client.api.endpoints.Users.Me.getIgnored();
    const res = await this.client.api.request('GET', endpoint, { query: { total: onlyCount } });
    return res.users.map(user => this.client.users.add(user));
  }

  async getFollowedThreads(cache = true) {
    const endpoint = this.client.api.endpoints.Threads.getFollowed();
    const data = await this.client.api.request('GET', endpoint);
    data.threads.forEach(thread => this.client.threads.add(thread, cache));
    return data.threads.map(thread => new FollowedThread(this.client, thread));
  }
}

module.exports = ClientUser;

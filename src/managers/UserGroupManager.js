'use strict';

const BaseManager = require('./BaseManager');
const UserGroup = require('../structures/UserGroup');

class UserGroupManager extends BaseManager {
  constructor(client, iterable, user) {
    super(client, iterable, UserGroup);
    this.user = user;
  }

  async fetch(id = this.user.id, cache = true) {
    const endpoint = this.client.api.endpoints.Users.getGroups(id);
    const data = await this.client.api.request('GET', endpoint);
    data.user_groups.forEach(group => this.add(group, cache));
    return this;
  }
}

module.exports = UserGroupManager;

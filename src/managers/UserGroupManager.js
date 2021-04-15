'use strict';

const BaseManager = require('./BaseManager');
const UserGroup = require('../structures/UserGroup');

class UserGroupManager extends BaseManager {
  constructor(client, iterable, userID) {
    super(client, iterable, UserGroup);
    this.userID = userID;
  }

  async fetch(id = this.userID, cache = true) {
    const endpoint = this.client.api.endpoints.Users.getGroups(id);
    const data = await this.client.api.request('GET', endpoint);
    data.user_groups.forEach(group => this.add(group, cache));
    return this;
  }
}

module.exports = UserGroupManager;

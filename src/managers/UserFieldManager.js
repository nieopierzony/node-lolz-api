'use strict';

const BaseManager = require('./BaseManager');
const UserField = require('../structures/UserField');

class UserFieldManager extends BaseManager {
  constructor(client, iterable, user) {
    super(client, iterable, UserField);
    this.user = user;
  }

  async fetch(id = this.user.id, cache = true) {
    const endpoint = this.client.api.endpoints.Users.getFields(id);
    const data = await this.client.api.request('GET', endpoint);
    data.fields.forEach(field => this.add(field, cache));
    return this;
  }
}

module.exports = UserFieldManager;

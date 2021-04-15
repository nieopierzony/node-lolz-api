'use strict';

const BaseManager = require('./BaseManager');
const UserField = require('../structures/UserField');

class UserFieldManager extends BaseManager {
  constructor(client, iterable, userID) {
    super(client, iterable, UserField);
    this.userID = userID;
  }

  async fetch(id = this.userID, cache = true) {
    const endpoint = this.client.api.endpoints.Users.getFields(id);
    const data = await this.client.api.request('GET', endpoint);
    data.fields.forEach(field => this.add(field, cache));
    return this;
  }
}

module.exports = UserFieldManager;

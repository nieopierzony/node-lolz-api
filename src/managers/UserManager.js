'use strict';

const BaseManager = require('./BaseManager');
const User = require('../structures/User');

class UserManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, User);
  }

  async create(email, username, password, options = {}) {
    const areArgsValid = typeof email === 'string' && typeof username === 'string' && typeof password === 'string';
    if (!areArgsValid) throw new TypeError('Какой-то из аргументов - невалидный');

    const parsedOptions = {
      user_email: email,
      username,
      password,
      password_algo: options.passwordAlgo,
      user_dob_day: options.birthday ? options.birthday.day : null,
      user_dob_month: options.birthday ? options.birthday.month : null,
      user_dob_year: options.birthday ? options.birthday.year : null,
      fields: options.fields,
      client_id: options.clientID,
      extra_data: options.extraData,
      extra_timestamp: options.extraTimestamp,
    };

    const endpoint = this.client.api.endpoints.Users.create();
    const data = await this.client.api.request('POST', endpoint, { data: parsedOptions });
    return this.add({ ...data.user, token: data.token }, options.cache);
  }

  async edit(id, data = {}) {
    if (!id) throw new TypeError('Необходимо указать ID');
    if (data.password && !data.oldPassword) throw new TypeError('Для изменения пароля необходимо указание старого');

    const parsedOptions = {
      password: data.password,
      password_old: data.oldPassword,
      password_algo: data.passwordAlgo,
      user_email: data.email,
      username: data.username,
      user_title: data.title,
      primary_group_id: data.primaryGroupID,
      secondary_group_ids: data.secondary_group_ids,
      user_dob_day: data.birthday ? data.birthday.day : null,
      user_dob_month: data.birthday ? data.birthday.month : null,
      user_dob_year: data.birthday ? data.birthday.year : null,
      fields: data.fields,
    };

    const endpoint = this.client.api.endpoints.Users.edit(id);
    const res = await this.client.api.request('PUT', endpoint, { data: parsedOptions });
    if (res.status !== 'ok') throw new Error(res);
    return this.client.users.fetch(id);
  }

  async find(rawQuery = {}, cache = true) {
    if (!rawQuery || !(rawQuery.username || rawQuery.email)) {
      throw new TypeError('Необходимо указать параметры запроса');
    }
    const query = {
      username: rawQuery.username,
      user_email: rawQuery.email,
    };

    const endpoint = this.client.api.endpoints.Users.find();
    const res = await this.client.api.request('GET', endpoint, { query });
    const foundedUsers = res.users.map(user => this.add(user, cache));
    return foundedUsers;
  }

  async fetch(id, cache = true, force = false) {
    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    const endpoint = this.client.api.endpoints.Users.get(id);
    const data = await this.client.api.request('GET', endpoint);
    return this.add(data.user, cache);
  }
}

module.exports = UserManager;

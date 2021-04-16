'use strict';

const BaseManager = require('./BaseManager');
const Notification = require('../structures/Notification');
const User = require('../structures/User');

class NotificationManager extends BaseManager {
  constructor(client, iterable) {
    super(client, iterable, Notification);
  }

  async read() {
    const endpoint = this.client.api.endpoints.Notification.read();
    await this.client.api.request('POST', endpoint);
    return this.fetchAll();
  }

  // TODO: Проверить, является ли ClientUser instanceof User
  // Этот endpoint не работает на стороне API (нет прав на просмотр)
  async createCustom(user, message, extra = {}) {
    if (!user) throw new TypeError('Необходимо указать ID или username пользователя');
    if (!message) throw new TypeError('Необходимо указать сообщение');

    const endpoint = this.client.api.endpoints.Notifications.createCustom();
    const userID = user instanceof User ? user.id : typeof user === 'number' ? user : null;
    const username = user instanceof User ? user.username : typeof user === 'string' ? user : null;
    const data = {
      user_id: userID,
      username: username,
      message,
      extra,
    };
    await this.client.api.request('POST', endpoint, { data });
  }

  async fetch(id, cache = true, force = false) {
    if (!id) throw new TypeError('Необходимо указать ID уведомления');
    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }
    const endpoint = this.client.api.endpoints.Notifications.get(id);
    const data = await this.client.api.request('GET', endpoint);
    return this.add(data.notification, cache);
  }

  async fetchAll(cache = true) {
    const endpoint = this.client.api.endpoints.Notifications.getAll();
    const data = await this.client.api.request('GET', endpoint);
    return data.notifications.map(el => this.add(el, cache));
  }
}

module.exports = NotificationManager;

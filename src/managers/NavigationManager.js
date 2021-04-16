'use strict';

const BaseManager = require('./BaseManager');
const NavigationCategory = require('../structures/NavigationCategory');
const NavigationForum = require('../structures/NavigationForum');
const NavigationLinkForum = require('../structures/NavigationLinkForum');

class NavigationManager extends BaseManager {
  async fetch(id, cache = true, force = false) {
    if (!id) throw new TypeError('Необходимо указать ID элемента');
    const existing = this.cache.get(id);
    if (!force && existing) return false;
    else if (existing && ['forum', 'category'].includes(existing.navigationType)) return existing.update();
    const data = await this.fetchAll(null, cache);
    const foundedElement = data.find(i => i.id === id);
    if (foundedElement) return foundedElement;
    else return null;
  }

  async fetchAll(parent, cache = true) {
    const endpoint = this.client.api.endpoints.Navigation.get();
    const rawData = await this.client.api.request('GET', endpoint, { query: { parent } });
    const parsedData = rawData.elements.map(el => {
      if (el.navigation_type === 'category') return new NavigationCategory(this.client, el);
      else if (el.navigation_type === 'forum') return new NavigationForum(this.client, el);
      else if (el.navigation_type === 'linkforum') return new NavigationLinkForum(this.client, el);
      else return null;
    });
    if (cache) parsedData.forEach(el => this.cache.set(el.navigationID, el));
    return parsedData;
  }
}

module.exports = NavigationManager;

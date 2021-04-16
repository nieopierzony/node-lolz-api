'use strict';

const NavigationManager = require('./NavigationManager');
const NavigationCategory = require('../structures/NavigationCategory');
const NavigationForum = require('../structures/NavigationForum');
const NavigationLinkForum = require('../structures/NavigationLinkForum');
const Thread = require('../structures/Thread');

class ThreadNavigationManager extends NavigationManager {
  constructor(client, thread) {
    super(client);
    this.thread = thread;
    this.threadID = this.thread instanceof Thread ? this.thread.id : this.thread;
  }
  async fetchAll(parent, cache = true) {
    const endpoint = this.client.api.endpoints.Threads.getNavigation(this.thread.id);
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

module.exports = ThreadNavigationManager;

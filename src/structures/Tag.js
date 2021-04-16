'use strict';

const Base = require('./Base');

class Tag extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.tag_id;
    this._patch(data);
  }

  _patch(data) {
    if ('tag_text' in data) {
      this.text = data.tag_text;
    } else if (typeof this.text !== 'string') {
      this.text = null;
    }

    if ('tag_use_count' in data) {
      this.useCount = data.tag_use_count;
    } else if (typeof this.useCount !== 'number') {
      this.useCount = null;
    }

    if ('tagged' in data) {
      // TODO: Доделать tagged
    }

    if ('links' in data) {
      this.links = {
        pages: typeof data.links.pages === 'string' ? data.links.permalink : null,
        next: typeof data.links.next === 'string' ? data.links.detail : null,
        prev: typeof data.links.prev === 'string' ? data.links.prev : null,
      };
    }
  }
}

module.exports = Tag;

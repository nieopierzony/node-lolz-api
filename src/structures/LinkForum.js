'use strict';

const Base = require('./Base');

class LinkForum extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.link_id;
    this._patch(data);
  }

  _patch(data) {
    if ('link_title' in data) {
      this.likeCount = data.link_title;
    } else if (typeof this.likeCount !== 'number') {
      this.likeCount = null;
    }

    if ('link_description' in data) {
      this.likeCount = data.link_description;
    } else if (typeof this.likeCount !== 'number') {
      this.likeCount = null;
    }

    if ('links' in data) {
      this.links = {
        target: typeof data.links.target === 'string' ? data.links.target : null,
        subElements: typeof data.links['sub-elements'] === 'string' ? data.links['sub-elements'] : null,
      };
    }

    if ('permissions' in data) {
      this.permissions = {
        view: Boolean(data.permissions.view),
        edit: Boolean(data.permissions.edit),
        delete: Boolean(data.permissions.delete),
      };
    }
  }
}

module.exports = LinkForum;

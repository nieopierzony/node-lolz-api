'use strict';

const Base = require('./Base');

class Page extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.page_id;
    this._patch(data);
  }

  _patch(data) {
    if ('page_title' in data) {
      this.title = data.page_title;
    } else if (typeof this.title !== 'string') {
      this.title = null;
    }

    if ('page_description' in data) {
      this.description = data.page_description;
    } else if (typeof this.description !== 'string') {
      this.description = null;
    }

    if ('page_view_count' in data) {
      this.viewCount = data.page_view_count;
    } else if (typeof this.viewCount !== 'number') {
      this.viewCount = null;
    }

    if ('page_html' in data) {
      this.html = data.page_html;
    } else if (typeof this.html !== 'string') {
      this.html = null;
    }

    if ('links' in data) {
      this.links = {
        permalink: typeof data.links.permalink === 'string' ? data.links.permalink : null,
        detail: typeof data.links.detail === 'string' ? data.links.detail : null,
        subPages: typeof data.links['sub-pages'] === 'string' ? data.links['sub-pages'] : null,
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

module.exports = Page;

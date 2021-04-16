'use strict';

const Base = require('./Base');

class Category extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.category_id;
    this._patch(data);
  }

  _patch(data) {
    if ('category_title' in data) {
      this.title = data.category_title;
    } else if (typeof this.title !== 'string') {
      this.title = null;
    }

    if ('category_description' in data) {
      this.description = data.category_description;
    } else if (typeof this.description !== 'string') {
      this.description = null;
    }

    if ('links' in data) {
      this.links = {
        permalink: typeof data.links.permalink === 'string' ? data.links.permalink : null,
        detail: typeof data.links.detail === 'string' ? data.links.detail : null,
        subCategories: typeof data.links['sub-categories'] === 'string' ? data.links['sub-categories'] : null,
        subForums: typeof data.links['sub-forums'] === 'string' ? data.links['sub-forums'] : null,
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

module.exports = Category;

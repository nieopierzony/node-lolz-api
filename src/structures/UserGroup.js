'use strict';

const Base = require('./Base');

class UserGroup extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.user_group_id;
    this._patch(data);
  }

  _patch(data) {
    if ('user_group_title' in data) {
      this.title = data.user_group_title;
    } else if (typeof this.title !== 'string') {
      this.title = null;
    }

    if ('is_primary_group' in data) {
      this.isPrimary = Boolean(data.is_primary_group);
    }
  }
}

module.exports = UserGroup;

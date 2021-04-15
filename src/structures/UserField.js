'use strict';

const Base = require('./Base');

class UserField extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.id;
    this._patch(data);
  }

  _patch(data) {
    if ('title' in data) {
      this.title = data.title;
    } else if (typeof this.title !== 'string') {
      this.title = null;
    }

    if ('description' in data) {
      this.description = data.description;
    } else if (typeof this.description !== 'string') {
      this.description = null;
    }

    if ('position' in data) {
      this.position = data.position;
    } else if (typeof this.position !== 'string') {
      this.position = null;
    }

    if ('display_group' in data) {
      this.displayGroup = data.display_group;
    } else if (typeof this.displayGroup !== 'string') {
      this.displayGroup = null;
    }

    if ('choices' in data) {
      this.messageCount = data.choices;
    }

    if ('values' in data) {
      this.messageCount = data.values;
    }

    if ('is_required' in data) {
      this.messageCount = Boolean(data.is_required);
    }

    if ('is_multiple_choice' in data) {
      this.messageCount = Boolean(data.is_multiple_choice);
    }

    if ('value' in data) {
      this.value = data.value;
    } else if (typeof this.value !== 'string') {
      this.value = null;
    }
  }
}

module.exports = UserField;

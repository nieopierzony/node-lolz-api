'use strict';

const Category = require('./LinkForum');

class NavigationCategory extends Category {
  constructor(client, data = {}) {
    super(client, data);
    this.navigationID = data.navigation_id;
  }

  _patch(data) {
    if ('navigation_type' in data) {
      this.navigationType = data.navigation_type;
    } else if (typeof this.navigationType !== 'string') {
      this.navigationType = null;
    }

    if ('navigation_depth' in data) {
      this.navigationDepth = data.navigation_depth;
    } else if (typeof this.navigationDepth !== 'number') {
      this.navigationDepth = null;
    }

    if ('navigation_parent_id' in data) {
      this.navigationParentID = data.navigation_parent_id;
    } else if (typeof this.navigationParentID !== 'number') {
      this.navigationParentID = null;
    }

    if ('has_sub_elements' in data) {
      this.hasSubElements = Boolean(data.has_sub_elements);
    }
  }
}

module.exports = NavigationCategory;

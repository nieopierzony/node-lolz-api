'use strict';

const Forum = require('./Forum');

class FollowedForum extends Forum {
  _patch(data = {}) {
    super._patch(data);
    if ('follow' in data) {
      this.follow = {
        post: Boolean(data.follow.post),
        alert: Boolean(data.follow.alert),
        email: Boolean(data.follow.email),
      };
    }
  }
}

module.exports = FollowedForum;

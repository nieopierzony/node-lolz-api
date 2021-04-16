'use strict';

const Thread = require('./Thread');

class FollowedThread extends Thread {
  _patch(data = {}) {
    super._patch(data);
    if ('follow' in data) {
      this.follow = {
        alert: Boolean(data.follow.alert),
        email: Boolean(data.follow.email),
      };
    }
  }
}

module.exports = FollowedThread;

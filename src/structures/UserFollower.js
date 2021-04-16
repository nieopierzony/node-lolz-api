'use strict';

const User = require('./User');

class UserFollower extends User {
  get followedAt() {
    if (!this.followedTimestamp) return null;
    return new Date(this.followedTimestamp * 1000);
  }

  _patch(data) {
    super._patch(data);

    if ('follow_date' in data) {
      this.followedTimestamp = data.follow_date;
    } else if (typeof this.followedTimestamp !== 'number') {
      this.followedTimestamp = null;
    }
  }
}

module.exports = UserFollower;

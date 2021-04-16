'use strict';

const User = require('./User');

class UserLike extends User {
  get likedAt() {
    if (!this.likeTimestamp) return null;
    return new Date(this.likeTimestamp * 1000);
  }

  _patch(data) {
    super._patch(data);

    if ('like_date' in data) {
      this.likeTimestamp = data.like_date;
    } else if (typeof this.likeTimestamp !== 'number') {
      this.likeTimestamp = null;
    }
  }
}

module.exports = UserLike;

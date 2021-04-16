'use strict';

const Base = require('./Base');

class ProfilePostComment extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.comment_id;
    this._patch(data);
  }

  _patch(data) {
    if ('timeline_user_id' in data) {
      this.profileID = data.timeline_user_id;
    } else if (typeof this.profileID !== 'number') {
      this.profileID = null;
    }

    if ('profile_post_id' in data) {
      this.profilePostID = data.profile_post_id;
    } else if (typeof this.profilePostID !== 'number') {
      this.profilePostID = null;
    }

    if ('comment_user_id' in data) {
      this.authorID = data.comment_user_id;
    } else if (typeof this.authorID !== 'number') {
      this.authorID = null;
    }

    if ('comment_username' in data) {
      this.authorUsername = data.comment_username;
    } else if (typeof this.authorUsername !== 'string') {
      this.authorUsername = null;
    }

    if ('user_is_ignored' in data) {
      this.isUserIgnored = Boolean(data.user_is_ignored);
    }

    if ('comment_create_date' in data) {
      this.createTimestamp = data.comment_create_date;
    } else if (typeof this.createTimestamp !== 'number') {
      this.createTimestamp = null;
    }

    if ('comment_body' in data) {
      this.body = data.comment_body;
    } else if (typeof this.body !== 'string') {
      this.body = null;
    }

    if ('links' in data) {
      this.links = {
        profile_post: typeof data.links.profile_post === 'string' ? data.links.profile_post : null,
        detail: typeof data.links.detail === 'string' ? data.links.detail : null,
        timeline: typeof data.links.timeline === 'string' ? data.links.timeline : null,
        userTimeline: typeof data.links.timeline_user === 'string' ? data.links.timeline_user : null,
        poster: typeof data.links.poster === 'string' ? data.links.poster : null,
        posterAvatar: typeof data.links.poster_avatar === 'string' ? data.links.poster_avatar : null,
      };
    }

    if ('permissions' in data) {
      this.permissions = {
        view: Boolean(data.permissions.view),
        delete: Boolean(data.permissions.delete),
      };
    }
  }
}

module.exports = ProfilePostComment;

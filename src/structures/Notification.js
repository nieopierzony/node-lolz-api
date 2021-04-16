'use strict';

const Base = require('./Base');

class Notification extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.notification_id;
    this._patch(data);
  }

  _patch(data) {
    if ('notification_create_date' in data) {
      this.createTimestamp = data.notification_create_date;
    } else if (typeof this.createTimestamp !== 'number') {
      this.createTimestamp = null;
    }

    if ('notification_is_unread' in data) {
      this.isUnread = Boolean(data.notification_is_unread);
    }

    if ('creator_user_id' in data) {
      this.creatorID = data.creator_user_id;
    } else if (typeof this.creatorID !== 'number') {
      this.creatorID = null;
    }

    if ('creator_username' in data) {
      this.creatorUsername = data.creator_username;
    } else if (typeof this.creatorUsername !== 'string') {
      this.creatorUsername = null;
    }

    if ('content_type' in data) {
      this.contentType = data.content_type;
    } else if (typeof this.contentType !== 'string') {
      this.contentType = null;
    }

    if ('content_id' in data) {
      this.contentID = data.content_id;
    } else if (typeof this.contentID !== 'number') {
      this.contentID = null;
    }

    if ('content_action' in data) {
      this.contentAction = data.content_action;
    } else if (typeof this.contentAction !== 'string') {
      this.contentAction = null;
    }

    if ('notification_type' in data) {
      this.type = data.notification_type;
    } else if (typeof this.type !== 'string') {
      this.type = null;
    }

    if ('notification_html' in data) {
      this.html = data.conversation_update_date;
    } else if (typeof this.html !== 'string') {
      this.html = null;
    }

    if ('links' in data) {
      this.links = {
        content: typeof data.links.content === 'string' ? data.links.content : null,
        creatorAvatar: typeof data.links.creator_avatar === 'string' ? data.links.creator_avatar : null,
      };
    }
  }
}

module.exports = Notification;

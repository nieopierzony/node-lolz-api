'use strict';

const Base = require('./Base');
const ConversationMessage = require('./ConversationMessage');

class Conversation extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.conversation_id;
    this._patch(data);
  }

  _patch(data) {
    if ('conversation_title' in data) {
      this.title = data.conversation_title;
    } else if (typeof this.title !== 'string') {
      this.title = null;
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

    if ('user_is_ignored' in data) {
      this.isUserIgnored = Boolean(data.user_is_ignored);
    }

    if ('conversation_create_date' in data) {
      this.createTimestamp = data.conversation_create_date;
    } else if (typeof this.createTimestamp !== 'number') {
      this.createTimestamp = null;
    }

    if ('conversation_update_date' in data) {
      this.updateTimestamp = data.conversation_update_date;
    } else if (typeof this.updateTimestamp !== 'number') {
      this.updateTimestamp = null;
    }

    if ('conversation_message_count' in data) {
      this.messageCount = data.conversation_message_count;
    } else if (typeof this.messageCount !== 'number') {
      this.messageCount = null;
    }

    if ('conversation_has_new_message' in data) {
      this.hasNewMessage = Boolean(data.conversation_has_new_message);
    }

    if ('conversation_is_open' in data) {
      this.isOpen = Boolean(data.conversation_is_open);
    }

    if ('conversation_is_deleted' in data) {
      this.isDeleted = Boolean(data.conversation_is_deleted);
    }

    if ('first_message' in data) {
      this.firstMessage = new ConversationMessage(this.client, data.first_message);
    }

    if ('recipients' in data) {
      this.recipients = data.recipients.map(u => ({
        id: u.id,
        username: u.username,
        avatar: u.avatar,
        bigAvatar: u.avatar_bit,
        smallAvatar: u.avatar_small,
      }));
    }

    if ('links' in data) {
      this.links = {
        permalink: typeof data.links.permalink === 'string' ? data.links.permalink : null,
        detail: typeof data.links.detail === 'string' ? data.links.detail : null,
        messages: typeof data.links.messages === 'string' ? data.links.messages : null,
      };
    }

    if ('permissions' in data) {
      this.permissions = {
        reply: Boolean(data.permissions.view),
        delete: Boolean(data.permissions.delete),
        uploadAttachment: Boolean(data.permissions.upload_attachment),
      };
    }
  }
}

module.exports = Conversation;

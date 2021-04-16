'use strict';

const Base = require('./Base');
const MessageAttachment = require('./MessageAttachment');

class ConversationMessage extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.message_id;
    this.conversationID = data.conversation_id;
    this._patch(data);
  }

  _patch(data) {
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

    if ('message_create_date' in data) {
      this.createTimestamp = data.message_create_date;
    } else if (typeof this.createTimestamp !== 'number') {
      this.createTimestamp = null;
    }

    if ('message_body' in data) {
      this.body = data.message_body;
    } else if (typeof this.body !== 'string') {
      this.body = null;
    }

    if ('message_body_html' in data) {
      this.bodyHTML = data.message_body_html;
    } else if (typeof this.bodyHTML !== 'string') {
      this.bodyHTML = null;
    }

    if ('message_body_plain_text' in data) {
      this.bodyPlain = data.message_body_plain_text;
    } else if (typeof this.bodyPlain !== 'string') {
      this.bodyPlain = null;
    }

    if ('signature' in data) {
      this.signature = data.signature;
    } else if (typeof this.signature !== 'string') {
      this.signature = null;
    }

    if ('signature_html' in data) {
      this.signatureHTML = data.signature_html;
    } else if (typeof this.signatureHTML !== 'string') {
      this.signatureHTML = null;
    }

    if ('signature_plain_text' in data) {
      this.signaturePlain = data.signature_plain_text;
    } else if (typeof this.signaturePlain !== 'string') {
      this.signaturePlain = null;
    }

    // TODO: Что это?
    if ('message_account_count' in data) {
      this.accountCount = data.message_account_count;
    } else if (typeof this.accountCount !== 'number') {
      this.accountCount = null;
    }

    if ('attachments' in data) {
      this.attachments = data.attachments.map(a => new MessageAttachment(this.client, a, this));
    }

    if ('links' in data) {
      this.links = {
        detail: typeof data.links.detail === 'string' ? data.links.detail : null,
        conversation: typeof data.links.conversation === 'string' ? data.links.conversation : null,
        creator: typeof data.links.creator === 'string' ? data.links.creator : null,
        creatorAvatar: typeof data.links.creator_avatar === 'string' ? data.links.creator_avatar : null,
        report: typeof data.links.report === 'string' ? data.links.report : null,
      };
    }

    if ('permissions' in data) {
      this.permissions = {
        view: Boolean(data.permissions.view),
        edit: Boolean(data.permissions.edit),
        delete: Boolean(data.permissions.delete),
        reply: Boolean(data.permissions.reply),
        uploadAttachment: Boolean(data.permissions.upload_attachment),
        report: Boolean(data.permissions.report),
      };
    }
  }
}

module.exports = ConversationMessage;

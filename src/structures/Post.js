'use strict';

const Base = require('./Base');
const PostAttachment = require('./PostAttachment');

class Post extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.post_id;
    this.threadID = data.threadID;
    this._patch(data);
  }

  _patch(data) {
    if ('poster_user_id' in data) {
      this.posterID = data.poster_user_id;
    } else if (typeof this.posterID !== 'number') {
      this.posterID = null;
    }

    if ('poster_username' in data) {
      this.posterUsername = data.poster_username;
    } else if (typeof this.posterUsername !== 'string') {
      this.posterUsername = null;
    }

    if ('user_is_ignored' in data) {
      this.isUserIgnored = Boolean(data.user_is_ignored);
    }

    if ('post_create_date' in data) {
      this.createTimestamp = data.post_create_date;
    } else if (typeof this.createTimestamp !== 'number') {
      this.createTimestamp = null;
    }

    if ('post_update_date' in data) {
      this.updateTimestamp = data.post_update_date;
    } else if (typeof this.updateTimestamp !== 'number') {
      this.updateTimestamp = null;
    }

    if ('post_body' in data) {
      this.body = data.post_body;
    } else if (typeof this.body !== 'string') {
      this.body = null;
    }

    if ('bodyHTML' in data) {
      this.bodyHTML = data.post_body_html;
    } else if (typeof this.bodyHTML !== 'string') {
      this.bodyHTML = null;
    }

    if ('bodyPlain' in data) {
      this.bodyPlain = data.post_body_plain_text;
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

    if ('post_like_count' in data) {
      this.likeCount = data.post_like_count;
    } else if (typeof this.likeCount !== 'number') {
      this.likeCount = null;
    }

    if ('post_attachment_count' in data) {
      this.attachmentCount = data.post_attachment_count;
    } else if (typeof this.attachmentCount !== 'number') {
      this.attachmentCount = null;
    }

    if ('post_is_published' in data) {
      this.isPublished = Boolean(data.post_is_published);
    }

    if ('post_is_deleted' in data) {
      this.isDeleted = Boolean(data.post_is_deleted);
    }

    if ('post_is_first_post' in data) {
      this.isFirstPost = Boolean(data.post_is_first_post);
    }

    if ('post_is_liked' in data) {
      this.isLiked = Boolean(data.post_is_liked);
    }

    if ('post_origin' in data) {
      this.origin = data.post_origin;
    } else if (typeof this.origin !== 'string') {
      this.origin = null;
    }

    if ('like_users' in data) {
      this.likeUsers = data.like_users.map(u => ({ id: u.id, username: u.username }));
    }

    if ('attachments' in data) {
      this.attachments = data.attachments.map(a => new PostAttachment(this.client, a, this));
    }

    if ('links' in data) {
      this.links = {
        permalink: typeof data.links.permalink === 'string' ? data.links.permalink : null,
        detail: typeof data.links.detail === 'string' ? data.links.detail : null,
        thread: typeof data.links.thread === 'string' ? data.links.thread : null,
        poster: typeof data.links.poster === 'string' ? data.links.poster : null,
        likes: typeof data.links.likes === 'string' ? data.links.likes : null,
        attachments: typeof data.links.attachments === 'string' ? data.links.attachments : null,
        report: typeof data.links.report === 'string' ? data.links.report : null,
        posterAvatar: typeof data.links.poster_avatar === 'string' ? data.links.poster_avatar : null,
      };
    }

    if ('permissions' in data) {
      this.permissions = {
        view: Boolean(data.permissions.view),
        edit: Boolean(data.permissions.edit),
        delete: Boolean(data.permissions.delete),
        reply: Boolean(data.permissions.reply),
        like: Boolean(data.permissions.like),
        report: Boolean(data.permissions.report),
        uploadAttachment: Boolean(data.permissions.upload_attachment),
      };
    }
  }
}

module.exports = Post;

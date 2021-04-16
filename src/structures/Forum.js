'use strict';

const Base = require('./Base');

class Forum extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.forum_id;
    this._patch(data);
  }

  _patch(data) {
    if ('forum_title' in data) {
      this.title = data.forum_title;
    } else if (typeof this.title !== 'string') {
      this.title = null;
    }
    if ('forum_description' in data) {
      this.description = data.forum_description;
    } else if (typeof this.description !== 'string') {
      this.description = null;
    }
    if ('forum_thread_count' in data) {
      this.threadCount = data.forum_thread_count;
    } else if (typeof this.threadCount !== 'number') {
      this.threadCount = null;
    }
    if ('forum_post_count' in data) {
      this.postCount = data.forum_post_count;
    } else if (typeof this.postCount !== 'number') {
      this.postCount = null;
    }

    if ('forum_is_follow' in data) {
      this.isFollowed = Boolean(data.forum_is_follow);
    }

    if ('thread_prefix_is_required' in data) {
      this.isPrefixRequired = Boolean(data.thread_prefix_is_required);
    }

    if ('forum_prefixes' in data) {
      this.prefixes = {
        groupTitle: typeof data.forum_prefixes.group_title === 'string' ? data.forum_prefixes.group_title : null,
        groupPrefixes: !data.groupPrefixes ? null : data.group_prefixes.map(p => ({ id: p.id, title: p.title })),
      };
    }

    if ('thread_default_prefix_id' in data) {
      this.defaultPrefixID = data.thread_default_prefix_id;
    } else if (typeof this.defaultPrefixID !== 'number') {
      this.defaultPrefixID = null;
    }

    if ('links' in data) {
      this.links = {
        permalink: typeof data.links.permalink === 'string' ? data.links.permalink : null,
        detail: typeof data.links.detail === 'string' ? data.links.detail : null,
        subCategories: typeof data.links['sub-categories'] === 'string' ? data.links['sub-categories'] : null,
        subForums: typeof data.links['sub-forums'] === 'string' ? data.links['sub-forums'] : null,
        threads: typeof data.links.threads === 'string' ? data.links.threads : null,
      };
    }

    if ('permissions' in data) {
      this.permissions = {
        view: Boolean(data.permissions.view),
        edit: Boolean(data.permissions.edit),
        delete: Boolean(data.permissions.delete),
        follow: Boolean(data.permissions.follow),
        createThread: Boolean(data.permissions.create_thread),
        uploadAttachment: Boolean(data.permissions.upload_attachment),
      };
    }
  }
}

module.exports = Forum;

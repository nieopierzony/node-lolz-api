'use strict';

const Base = require('./Base');
const Post = require('./Post');

class Thread extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.thread_id;
    this.forumID = data.forum_id;
    this._patch(data);
  }

  _patch(data) {
    if ('thread_title' in data) {
      this.title = data.thread_title;
    } else if (typeof this.title !== 'string') {
      this.title = null;
    }

    if ('thread_view_count' in data) {
      this.viewCount = data.thread_view_count;
    } else if (typeof this.viewCount !== 'number') {
      this.viewCount = null;
    }

    if ('thread_post_count' in data) {
      this.postCount = data.thread_post_count;
    } else if (typeof this.postCount !== 'number') {
      this.postCount = null;
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

    if ('thread_create_date' in data) {
      this.createTimestamp = data.thread_create_date;
    } else if (typeof this.createTimestamp !== 'string') {
      this.createTimestamp = null;
    }

    if ('thread_update_date' in data) {
      this.updatedTimestamp = data.thread_update_date;
    } else if (typeof this.updatedTimestamp !== 'number') {
      this.updatedTimestamp = null;
    }

    if ('user_is_ignored' in data) {
      this.isUserIgnored = Boolean(data.user_is_ignored);
    }

    if ('thread_is_new' in data) {
      this.isNew = Boolean(data.thread_is_new);
    }

    if ('thread_is_published' in data) {
      this.isPublished = Boolean(data.thread_is_published);
    }

    if ('thread_is_deleted' in data) {
      this.isDeleted = Boolean(data.thread_is_deleted);
    }

    if ('thread_is_sticky' in data) {
      this.isSticky = Boolean(data.thread_is_sticky);
    }

    if ('thread_is_followed' in data) {
      this.isFollowed = Boolean(data.thread_is_followed);
    }

    if ('first_post' in data) {
      this.firstPost = new Post(data.first_post);
    }

    if ('thread_prefixes' in data) {
      this.prefixes = data.thread_prefixes.map(p => ({ id: p.id, title: p.title }));
    }

    if ('thread_tags ' in data) {
      this.tags = data.thread_tags;
    }

    if ('thread_has_poll' in data) {
      this.hasPoll = Boolean(data.thread_has_poll);
    }

    if ('links' in data) {
      this.links = {
        permalink: typeof data.links.permalink === 'string' ? data.links.permalink : null,
        detail: typeof data.links.detail === 'string' ? data.links.detail : null,
        forum: typeof data.links.forum === 'string' ? data.links.forum : null,
        posts: typeof data.links.posts === 'string' ? data.links.posts : null,
        unreadPosts: typeof data.links.posts_unread === 'string' ? data.links.posts_unread : null,
        firstPoster: typeof data.links.first_poster === 'string' ? data.links.first_poster : null,
        firstPosterAvatar: typeof data.links.first_poster_avatar === 'string' ? data.links.first_poster_avatar : null,
        firstPost: typeof data.links.first_post === 'string' ? data.links.first_post : null,
        lastPoster: typeof data.links.last_poster === 'string' ? data.links.last_poster : null,
        lastPost: typeof data.links.last_post === 'string' ? data.links.last_post : null,
        poll: typeof data.links.poll === 'string' ? data.links.detail : null,
      };
    }

    if ('permissions' in data) {
      this.permissions = {
        view: Boolean(data.permissions.view),
        delete: Boolean(data.permissions.delete),
        follow: Boolean(data.permissions.follow),
        post: Boolean(data.permissions.post),
        uploadAttachment: Boolean(data.permissions.upload_attachment),
        editPrefix: Boolean(data.permissions.edit_prefix),
        editTags: Boolean(data.permissions.edit_tags),
        editTitle: Boolean(data.permissions.edit_title),
      };
    }
  }
}

module.exports = Thread;

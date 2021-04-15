'use strict';

const Base = require('./Base');

class ProfilePost extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.profile_post_id;
    this._patch(data);
  }

  async getLikes() {
    const endpoint = this.client.api.endpoints.ProfilePosts.getLikes(this.id);
    const res = await this.client.api.request('GET', endpoint);
    return res.users.map(user => this.client.users.add(user));
  }

  async like() {
    const endpoint = this.client.api.endpoints.ProfilePosts.like(this.id);
    await this.client.api.request('POST', endpoint);
    return this.update();
  }

  async unlike() {
    const endpoint = this.client.api.endpoints.ProfilePosts.unlike(this.id);
    await this.client.api.request('DELETE', endpoint);
    return this.update();
  }

  async getComments(before) {
    if (before && !(before instanceof Date)) throw new TypeError("Значение 'before' должно быть типа Date");
    const endpoint = this.client.api.endpoints.ProfilePosts.getComments(this.id);
    const res = await this.client.api.request('GET', endpoint, { query: { before: before.getTime() / 1000 } });
    if ('profile_post' in res) this._patch(res.profile_post);
    if ('timeline_user' in res) this.client.users.add(res.timeline_user);
    return res.comments.map(comment => this.add(comment));
  }

  update() {
    return this.profilePosts.fetch(this.id);
  }

  async report(message) {
    if (!message && typeof message !== 'string') throw new TypeError("Поле 'message' должно быть типа string");
    const endpoint = this.client.api.endpoints.profilePosts.report(this.id);
    await this.client.api.request('POST', endpoint, { data: { message } });
    return this.update();
  }

  _patch(data) {
    this.profile = {
      userID: typeof data.timeline_user_id === 'number' ? data.timeline_user_id : null,
      username: typeof data.timeline_username === 'string' ? data.timeline_username : null,
    };

    this.author = {
      userID: typeof data.poster_user_id === 'number' ? data.poster_user_id : null,
      username: typeof data.poster_username === 'string' ? data.poster_username : null,
      isIgnored: Boolean(data.user_is_ignored),
    };

    if ('post_create_date' in data) {
      this.createTimestamp = data.post_create_date;
    } else if (typeof this.createTimestamp !== 'number') {
      this.createTimestamp = null;
    }

    if ('post_body' in data) {
      this.body = data.post_body;
    } else if (typeof this.body !== 'string') {
      this.body = null;
    }

    if ('post_like_count' in data) {
      this.likeCount = data.post_like_count;
    } else if (typeof this.likeCount !== 'number') {
      this.likeCount = null;
    }

    if ('post_comment_count' in data) {
      this.commentCount = data.post_comment_count;
    } else if (typeof this.commentCount !== 'number') {
      this.commentCount = null;
    }

    if ('post_is_published' in data) {
      this.isPublished = Boolean(data.post_is_published);
    }

    if ('post_is_deleted' in data) {
      this.isDeleted = Boolean(data.post_is_deleted);
    }

    if ('post_is_liked' in data) {
      this.isLiked = Boolean(data.post_is_liked);
    }

    // if ('latest_comments' in data) {
    //   this.comments = new ProfilePostCommentManager(this.client, data.latest_comments);
    // }

    if ('links' in data) {
      this.links = {
        permalink: typeof data.links.permalink === 'string' ? data.links.permalink : null,
        detail: typeof data.links.detail === 'string' ? data.links.detail : null,
        timeline: typeof data.links.timeline === 'string' ? data.links.timeline : null,
        userTimeline: typeof data.links.timeline_user === 'string' ? data.links.timeline_user : null,
        poster: typeof data.links.poster === 'string' ? data.links.poster : null,
        likes: typeof data.links.likes === 'string' ? data.links.likes : null,
        comments: typeof data.links.comments === 'string' ? data.links.comments : null,
        report: typeof data.links.report === 'string' ? data.links.report : null,
        posterAvatar: typeof data.links.poster_avatar === 'string' ? data.links.poster_avatar : null,
      };
    }

    if ('permissions' in data) {
      this.permissions = {
        view: Boolean(data.permissions.view),
        edit: Boolean(data.permissions.edit),
        delete: Boolean(data.permissions.delete),
        like: Boolean(data.permissions.like),
        comment: Boolean(data.permissions.comment),
        report: Boolean(data.permissions.report),
      };
    }
  }
}

module.exports = ProfilePost;

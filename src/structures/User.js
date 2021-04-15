'use strict';

const Base = require('./Base');
const Token = require('./Token');
const UserFieldManager = require('../managers/UserFieldManager');
const UserGroupManager = require('../managers/UserGroupManager');
const { Sizes } = require('../util/Constants');

class User extends Base {
  constructor(client, data) {
    super(client);
    this.id = data.user_id;
    this._patch(data);
  }

  edit(data) {
    return this.client.users.edit(this.id, data);
  }

  get createdAt() {
    if (!this.createdTimestamp) return null;
    return new Date(this.createdTimestamp * 1000);
  }

  get lastSeenAt() {
    if (!this.lastSeenAtTimestamp) return null;
    return new Date(this.lastSeenAtTimestamp * 1000);
  }

  getAvatarURL(size = Sizes.Medium) {
    if (size === Sizes.Small && this.links.smallAvatar) return this.links.smallAvatar;
    else if (size === Sizes.Medium && this.links.avatar) return this.links.avatar;
    else if (size === Sizes.Large && this.links.bigAvatar) return this.links.bigAvatar;
    else return null;
  }

  _patch(data) {
    if ('username' in data) {
      this.username = data.username;
    } else if (typeof this.username !== 'string') {
      this.username = null;
    }

    if ('user_title' in data) {
      this.title = data.user_title;
    } else if (typeof this.title !== 'string') {
      this.title = null;
    }

    if ('user_register_date' in data) {
      this.createdTimestamp = data.user_register_date;
    } else if (typeof this.createdTimestamp !== 'number') {
      this.createdTimestamp = null;
    }

    if ('user_last_seen_date' in data) {
      this.lastSeenAtTimestamp = data.user_last_seen_date;
    } else if (typeof this.lastSeenAtTimestamp !== 'number') {
      this.lastSeenAtTimestamp = null;
    }

    if ('user_like_count' in data) {
      this.likesCount = data.user_like_count;
    } else if (typeof this.likesCount !== 'number') {
      this.likesCount = null;
    }

    if ('user_message_count' in data) {
      this.messageCount = data.user_message_count;
    } else if (typeof this.messageCount !== 'number') {
      this.messageCount = null;
    }

    if ('user_email' in data) {
      this.email = data.user_email;
    } else if (typeof this.email !== 'string') {
      this.email = null;
    }

    if ('user_timezone_offset' in data) {
      this.timezoneOffset = data.user_timezone_offset;
    } else if (typeof this.timezoneOffset !== 'number') {
      this.timezoneOffset = null;
    }

    if ('user_unread_conversation_count' in data) {
      this.unreadConversationCount = data.user_unread_conversation_count;
    } else if (typeof this.unreadConversationCount !== 'number') {
      this.unreadConversationCount = null;
    }

    if ('user_followers_total' in data) {
      this.followersCount = data.user_followers_total;
    } else if (typeof this.followersCount !== 'number') {
      this.followersCount = null;
    }

    if ('user_followings_total' in data) {
      this.followingsCount = data.user_followings_total;
    } else if (typeof this.followingsCount !== 'number') {
      this.followingsCount = null;
    }

    if ('user_is_admin' in data) {
      this.isAdmin = Boolean(data.user_is_admin);
    }

    if ('user_is_moderator' in data) {
      this.isModerator = Boolean(data.user_is_moderator);
    }

    if ('user_is_staff' in data) {
      this.isStaff = Boolean(data.user_is_staff);
    }

    if ('user_is_valid' in data) {
      this.isValid = Boolean(data.user_is_valid);
    }

    if ('user_has_password' in data) {
      this.hasPassword = Boolean(data.user_has_password);
    }

    if ('user_is_verified' in data) {
      this.isVerified = Boolean(data.user_is_verified);
    }

    if ('user_is_followed' in data) {
      this.isFollowed = Boolean(data.user_is_followed);
    }

    if ('user_is_ignored' in data) {
      this.isIgnored = Boolean(data.user_is_ignored);
    }

    if ('fields' in data) {
      this.fields = new UserFieldManager(this.client, data.fields, this.id);
    }

    if ('user_groups' in data) {
      this.groups = new UserGroupManager(this.client, data.user_groups, this.id);
    }

    if ('user_external_authentications' in data) {
      const obj = data.user_external_authentications;
      const isValid =
        typeof obj === 'object' &&
        obj.every(
          el =>
            el.provider && typeof el.provider === 'string' && el.provider_key && typeof el.provider_key === 'string',
        );

      if (!isValid) this.connections = null;
      else this.connections = obj.map(el => ({ provider: el.provider, key: el.provider_key }));
    }

    if ('links' in data) {
      this.links = {
        permalink: data.links.permalink,
        detail: data.links.detail,
        avatar: data.links.avatar,
        bigAvatar: data.links.avatar_big,
        smallAvatar: data.links.avatar_small,
        followers: data.links.followers,
        followings: data.links.followings,
        ignore: data.links.ignore,
        timeline: data.links.timeline,
      };
    }

    if ('permissions' in data) {
      this.permissions = data.permissions;
    }

    if ('self_permissions' in data) {
      this.selfPermissions = {
        createConversations: Boolean(data.self_permissions.create_conversations),
        uploadConversationAttachment: Boolean(data.self_permissions.upload_attachment_conversation),
      };
    }

    if ('edit_permissions' in data) {
      const obj = data.edit_permissions;

      this.editPermissions = {
        password: obj.password ? Boolean(obj.password) : null,
        email: obj.user_email ? Boolean(obj.user_email) : null,
        username: obj.username ? Boolean(obj.username) : null,
        title: obj.user_title ? Boolean(obj.user_title) : null,
        primaryGroupID: obj.primary_group_id ? Boolean(obj.primary_group_id) : null,
        secondaryGroupIDs: obj.secondary_group_ids ? Boolean(obj.secondary_group_ids) : null,
        dobDay: obj.user_dob_day ? Boolean(obj.user_dob_day) : null,
        dobMonth: obj.user_dob_month ? Boolean(obj.user_dob_month) : null,
        dobYear: obj.user_dob_year ? Boolean(obj.user_dob_year) : null,
        fields: obj.fields ? Boolean(obj.fields) : null,
      };
    }

    if ('token' in data) {
      this.token = new Token(this.client, data.token);
    }

    this.birthday = {
      day: data.user_dob_day && typeof data.user_dob_day === 'number' ? data.user_dob_day : null,
      month: data.user_dob_month && typeof data.user_dob_month === 'number' ? data.user_dob_month : null,
      year: data.user_dob_year && typeof data.user_dob_year === 'number' ? data.user_dob_year : null,
    };
  }
}

module.exports = User;

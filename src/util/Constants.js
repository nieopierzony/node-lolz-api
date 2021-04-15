'use strict';

const Package = require('../../package.json');

exports.DefaultOptions = {
  apiURL: 'https://lolz.guru/api/index.php?',
  tokenType: 'Bearer',
};

exports.UserAgent = `LolzBot (${Package.homepage.split('#')[0]}, ${Package.version}) Node.js/${process.version}`;

exports.Sizes = {
  Small: 's',
  Medium: 'm',
  Large: 'l',
};

exports.Endpoints = {
  root(root) {
    return {
      Categories: {
        getAll: () => `${root}/categories`,
        get: id => `${root}/categories/${id}`,
      },
      Forums: {
        getAll: () => `${root}/forums`,
        get: id => `${root}/forums/${id}`,
        getFollowers: id => `${root}/forums/${id}/followers`,
        follow: id => `${root}/forums/${id}/followers`,
        unfollow: id => `${root}/forums/${id}/followers`,
        getFollowed: () => `${root}/forums/followed`,
      },
      Pages: {
        getAll: () => `${root}/pages`,
        get: id => `${root}/pages/${id}`,
      },
      Navigation: {
        get: () => `${root}/navigation`,
      },
      Threads: {
        getAll: () => `${root}/threads`,
        create: () => `${root}/threads`,
        get: id => `${root}/threads/${id}`,
        sendPost: id => `${root}/threads/${id}`,
        delete: id => `${root}/threads/${id}`,
        getFollowers: id => `${root}/threads/${id}/followers`,
        follow: id => `${root}/threads/${id}/followers`,
        unfollow: id => `${root}/threads/${id}/followers`,
        getFollowed: () => `${root}/threads/followed`,
        getNavigation: id => `${root}/threads/${id}/navigation`,
        getUnread: () => `${root}/threads/new`,
        getRecent: () => `${root}/threads/recent`,
        Poll: {
          get: id => `${root}/threads/${id}/poll`,
          vote: id => `${root}/threads/${id}/poll/votes`,
          getResults: id => `${root}/threads/${id}/poll/results`,
        },
        Attachments: {
          upload: () => `${root}/threads/attachments`,
          delete: () => `${root}/threads/attachments`,
        },
      },
      Posts: {
        getAll: () => `${root}/posts`,
        create: () => `${root}/posts`,
        get: id => `${root}/posts/${id}`,
        edit: id => `${root}/posts/${id}`,
        delete: id => `${root}/posts/${id}`,
        getLikes: id => `${root}/posts/${id}/likes`,
        like: id => `${root}/posts/${id}/likes`,
        unlike: id => `${root}/posts/${id}/likes`,
        repost: id => `${root}/posts/${id}/repost`,
        getUnread: () => `${root}/posts/unread`,
        Attachments: {
          getAll: id => `${root}/posts/${id}/attachments`,
          get: (post, attachment) => `${root}/posts/${post}/attachments/${attachment}`,
          delete: (post, attachment) => `${root}/posts/${post}/attachments/${attachment}`,
          upload: () => `${root}/posts/attachments`,
        },
      },
      Tags: {
        getPopular: () => `${root}/tags`,
        getAll: () => `${root}/tags/list`,
        get: id => `${root}/tags/${id}`,
        find: () => `${root}/tags/find`,
      },
      Users: {
        getAll: () => `${root}/users`,
        create: () => `${root}/users`,
        getFields: () => `${root}/users/fields`,
        find: () => `${root}/users/find`,
        get: id => `${root}/users/${id}`,
        edit: id => `${root}/users/${id}`,
        resetPassword: () => `${root}/lost-password`,
        uploadAvatar: id => `${root}/users/${id}/avatar`,
        deleteAvatar: id => `${root}/users/${id}/avatar`,
        getFollowers: id => `${root}/users/${id}/followers`,
        follow: id => `${root}/users/${id}/followers`,
        unfollow: id => `${root}/users/${id}/followers`,
        getFollowings: id => `${root}/users/${id}/followings`,
        ignore: id => `${root}/users/${id}/ignore`,
        unignore: id => `${root}/users/${id}/ignore`,
        getAllGroups: () => `${root}/users/groups`,
        getGroups: id => `${root}/users/${id}/groups`,
        Me: {
          get: () => `${root}/users/me`,
          edit: () => `${root}/users/me`,
          deleteAvatar: () => `${root}/users/me/avatar`,
          uploadAvatar: () => `${root}/users/me/avatar`,
          getFollowers: () => `${root}/users/me/followers`,
          getFollowings: () => `${root}/users/me/followings`,
          getGroups: () => `${root}/users/me/groups`,
          getIgnored: () => `${root}/users/ignored`,
        },
      },
      ProfilePosts: {
        getPosts: id => `${root}/users/${id}/timeline`,
        create: id => `${root}/users/${id}/timeline`,
        get: id => `${root}/profile-posts/${id}`,
        edit: id => `${root}/profile-posts/${id}`,
        delete: id => `${root}/profile-posts/${id}`,
        getLikes: id => `${root}/profile-posts/${id}/likes`,
        like: id => `${root}/profile-posts/${id}/likes`,
        unlike: id => `${root}/profile-posts/${id}/likes`,
        report: id => `${root}/profile-posts/${id}/report`,
        Comments: {
          getAll: id => `${root}/profile-posts/${id}/comments`,
          create: id => `${root}/profile-posts/${id}/comments`,
          get: (post, comment) => `${root}/profile-posts/${post}/comments/${comment}`,
          delete: (post, comment) => `${root}/profile-posts/${post}/comments/${comment}`,
        },
      },
      Conversations: {
        getAll: () => `${root}/conversations`,
        create: () => `${root}/conversations`,
        get: id => `${root}/conversations/${id}`,
        delete: id => `${root}/conversations/${id}`,
        Attachments: {
          upload: () => `${root}/conversations/attachments`,
          delete: () => `${root}/conversations/attachments`,
        },
        Messages: {
          getAll: () => `${root}/conversation-messages`,
          get: id => `${root}/conversation-messages/${id}`,
          edit: id => `${root}/conversation-messages/${id}`,
          delete: id => `${root}/conversation-messages/${id}`,
          report: id => `${root}/conversation-messages/${id}/report`,
          Attachments: {
            getAll: id => `${root}/conversation-messages/${id}/attachments`,
            get: (message, attachment) => `${root}/conversation-messages/${message}/attachments/${attachment}`,
            upload: () => `${root}/conversation-messages/attachments`,
          },
        },
      },
      Notifications: {
        getAll: () => `${root}/notifications`,
        get: id => `${root}/notifications/${id}/content`,
        createCustom: () => `${root}/notifications/custom`,
        read: () => `${root}/notifications/read`,
      },
      Search: {
        threads: () => `${root}/search/threads`,
        posts: () => `${root}/search/posts`,
        profilePosts: () => `${root}/search/profile-posts`,
        search: () => `${root}/search`,
        tagged: () => `${root}/tagged`,
      },
    };
  },
};

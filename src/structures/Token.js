'use strict';

const Base = require('./Base');

class Token extends Base {
  constructor(client, data) {
    super(client);
    this.userID = data.user_id;
    this.createdAtTimestamp = Date.now();
    this._patch(data);
  }

  get refreshTokenBecomeExpiredAt() {
    if (!this.refreshTokenExpiresIn) return null;
    return new Date(this.createdAtTimestamp * 1000 + this.refreshTokenExpiresIn);
  }

  get becomeExpiredAt() {
    if (!this.expiresIn) return null;
    return new Date(this.createdAtTimestamp * 1000 + this.expiresIn);
  }

  get createdAt() {
    return new Date(this.createdAtTimestamp);
  }

  _patch(data) {
    if ('access_token' in data) {
      this.accessToken = data.access_token;
    } else if (typeof this.accessToken !== 'string') {
      this.accessToken = null;
    }

    if ('expires_in' in data) {
      this.expiresIn = +data.expires_in;
    } else if (typeof this.expiresIn !== 'number') {
      this.expiresIn = null;
    }

    if ('token_type' in data) {
      this.type = data.token_type;
    } else if (typeof this.type !== 'string') {
      this.type = null;
    }

    if ('scope' in data) {
      this.scope = data.scope.split(' ');
    } else if (typeof this.scope !== 'object') {
      this.scope = null;
    }

    if ('refresh_token' in data) {
      this.refreshToken = data.refresh_token;
    } else if (typeof this.refreshToken !== 'string') {
      this.refreshToken = null;
    }

    if ('refresh_token_expires_in' in data) {
      this.refreshTokenExpiresIn = data.refresh_token_expires_in;
    } else if (typeof this.refreshTokenExpiresIn !== 'number') {
      this.refreshTokenExpiresIn = null;
    }
  }
}

module.exports = Token;

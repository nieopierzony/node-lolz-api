'use strict';

const RESTManager = require('./api/RESTManager');
const UserManager = require('./managers/UserManager');
const { DefaultOptions } = require('./util/Constants');
const Util = require('./util/Util');

/**
 * Главный класс для взаимодействия с LolzTeam API
 */
class Client {
  constructor(options = {}) {
    this.options = Util.mergeDefault(DefaultOptions, options);
    this.api = new RESTManager(this, options.tokenType);
    this.token = null;

    this.users = new UserManager(this);
    this.user = null;
  }

  async login(token = this.token) {
    if (!token || typeof token !== 'string') throw new Error('TOKEN_INVALID');
    this.token = token;
    this.user = await this.users.fetch('me');

    return this;
  }

  _validateOptions(options = this.options) {}
}

module.exports = Client;

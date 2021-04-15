'use strict';

const RequestHandler = require('./APIRequest');
const { Endpoints } = require('../util/Constants');

class RESTManager {
  constructor(client, tokenType = 'Bearer') {
    this.client = client;
    this.tokenType = tokenType;
  }

  get auth() {
    const token = this.client.token;
    if (!token) throw new Error('TOKEN_MISSING');
    return `${this.tokenType} ${token}`;
  }

  async request(method, url, options = {}) {
    const apiRequest = new RequestHandler(this, method, url, options);
    const res = await apiRequest.execute();
    return res.data;
  }

  get endpoints() {
    return Endpoints.root(this.client.options.apiURL);
  }
}

module.exports = RESTManager;

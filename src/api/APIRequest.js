'use strict';

const axios = require('axios');
const FormData = require('form-data');
const { UserAgent } = require('../util/Constants');
const Util = require('../util/Util');

class APIRequest {
  constructor(manager, method, path, options) {
    this.manager = manager;
    this.client = manager.client;
    this.method = method;
    this.path = path;
    this.options = options;

    let queryString = '';
    if (options.query) {
      const query = Object.entries(options.query)
        .filter(([, value]) => value !== null && typeof value !== 'undefined')
        .flatMap(([key, value]) => (Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]));
      queryString = new URLSearchParams(query).toString();
    }
    this.path = `${path}${queryString && `${options.querySuffix ? options.querySuffix : '?'}${queryString}`}`;
  }

  execute() {
    const defaultHeaders = {
      'User-Agent': UserAgent,
      Authorization: this.manager.auth,
      Cookie: 'xf_logged_in=1; xf_market_currency=usd',
    };
    let headers = Util.mergeDefault(defaultHeaders, this.options.headers);

    let data;
    if (this.options.files) {
      data = new FormData();
      Object.entries(this.options.files).forEach(([key, value]) => {
        if (value) data.append(key, value, `${key}.jpg`);
      });

      headers = { ...headers, ...data.getHeaders() };
    } else if (this.options.data) {
      data = encodeURIComponent(
        Object.entries(this.options.data).map(([key, value]) => (value ? `${key}=${value}` : undefined)),
      );
      headers = { ...headers, 'content-type': 'application/x-www-form-urlencoded' };
    }

    return axios.request({ method: this.method, url: this.path, data, headers });
  }
}

module.exports = APIRequest;

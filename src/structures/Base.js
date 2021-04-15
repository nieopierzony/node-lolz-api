'use strict';

class Base {
  constructor(client) {
    this.client = client;
  }

  _patch(data) {
    return data;
  }

  valueOf() {
    return this.id;
  }
}

module.exports = Base;

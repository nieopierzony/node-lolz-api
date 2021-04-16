'use strict';

const Attachment = require('./Attachment');

class PostAttachment extends Attachment {
  constructor(client, data = {}, post) {
    super(client, data);
    this.post = post;
  }
}

module.exports = PostAttachment;

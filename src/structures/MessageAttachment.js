'use strict';

const Attachment = require('./Attachment');

class MessageAttachment extends Attachment {
  constructor(client, data = {}, message) {
    super(client, data);
    this.message = message;
  }
}

module.exports = MessageAttachment;

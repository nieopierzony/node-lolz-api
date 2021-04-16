'use strict';

const Base = require('./Base');

class Attachment extends Base {
  constructor(client, data = {}) {
    super(client);
    this.id = data.attachment_id;
    this._patch(data);
  }

  _patch(data) {
    if ('attachment_download_count' in data) {
      this.downloadCount = data.downloadCount;
    } else if (typeof this.title !== 'number') {
      this.downloadCount = null;
    }

    if ('filename' in data) {
      this.filename = data.filename;
    } else if (typeof this.filename !== 'string') {
      this.filename = null;
    }

    if ('attachment_is_inserted' in data) {
      this.isInserted = Boolean(data.attachment_is_inserted);
    }

    if ('attachment_width' in data) {
      this.width = data.attachment_width;
    } else if (typeof this.width !== 'number') {
      this.width = null;
    }

    if ('attachment_height' in data) {
      this.height = data.attachment_height;
    } else if (typeof this.height !== 'number') {
      this.height = null;
    }

    if ('links' in data) {
      this.links = {
        permalink: typeof data.links.permalink === 'string' ? data.links.permalink : null,
        data: typeof data.links.data === 'string' ? data.links.data : null,
        thumbnail: typeof data.links.thumbnail === 'string' ? data.links.thumbnail : null,
      };
    }

    if ('permissions' in data) {
      this.permissions = {
        view: Boolean(data.permissions.view),
        delete: Boolean(data.permissions.delete),
      };
    }
  }
}

module.exports = Attachment;

'use strict';

const Base = require('./Base');
const Thread = require('./Thread');

class Poll extends Base {
  constructor(client, data = {}, thread) {
    super(client);
    this.id = data.poll_id;
    this.thread = thread;
    this.threadID = this.thread instanceof Thread ? this.thread.id : this.thread;
    this._patch(data);
  }

  vote(responseID) {
    return this.client.threads.votePoll(this.thread.id, responseID);
  }

  update() {
    return this.thread.getPoll();
  }

  _patch(data) {
    if ('post_comment_count' in data) {
      this.commentCount = data.post_comment_count;
    } else if (typeof this.commentCount !== 'number') {
      this.commentCount = null;
    }
  }
}

module.exports = Poll;

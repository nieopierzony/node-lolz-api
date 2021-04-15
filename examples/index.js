'use strict';

const fs = require('fs');
const { Client } = require('../src');

const client = new Client({ apiURL: 'http://test1.ru/api/index.php?' });
client
  .login('e4c38061f180dd561ef7133cbbf71936bb71addc')
  .then(async () => {
    console.log(`[Client] Авторизован как ${client.user.username} (${client.user.links.permalink})`);
    const res = await client.user.getProfilePosts();
    console.log(res.posts[0].links);
  })
  .catch(err => console.error(err, err.response ? err.response.data : null));

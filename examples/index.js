'use strict';

const fs = require('fs');
const { Client } = require('../src');

const client = new Client({ apiURL: 'http://test1.ru/api/index.php?' });
client
  .login('77c9fce7693575a0b2accd9d4dca2fa6cca00be7')
  .then(async () => {
    console.log(`[Client] Авторизован как ${client.user.username} (${client.user.links.permalink})`);
    const res = await client.user.getProfilePosts();
    console.log(await res.posts[0].edit('test134423'));
  })
  .catch(err => console.error(err, err.response ? err.response.data : null));

'use strict';

const fs = require('fs');
const { Client, Constants } = require('../src');

const client = new Client({ apiURL: 'http://test1.ru/api/index.php?' });
client
  .login('7b94263c358f5462f0d1ff86a841b6ce37ac19e6')
  .then(async () => {
    console.log(`[Client] Авторизован как ${client.user.username} (${client.user.links.permalink})`);
    const buffer = fs.readFileSync('./examples/avatar.png');
    const res = await client.user.uploadAvatar(buffer);
    console.log(res);
  })
  .catch(err => console.error(err, err.response ? err.response.data : null));

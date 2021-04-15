'use strict';

const { Client, Constants } = require('../src');

const client = new Client({ apiURL: 'http://test1.ru/api/index.php?' });
client
  .login('b65cbf6aff8f1426787b3d367060a54f5d30a262')
  .then(async () => {
    console.log(`[Client] Авторизован как ${client.user.username} (${client.user.links.permalink})`);
    const foundedUsers = await client.users.find({ username: '1618' });
    console.log(client.users.cache);
  })
  .catch(err => console.error(err, err.response ? err.response.data : null));

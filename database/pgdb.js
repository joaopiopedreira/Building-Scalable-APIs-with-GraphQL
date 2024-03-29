const humps = require('humps');
const _ = require('lodash');
const camelizeKeys = humps.camelizeKeys;

module.exports = pgPool => {
  const orderedFor = (rows, collection, field) {
    const data = humps.camelizeKeys(rows);
    const inGroupsOfField = _.groupBy(data, field);

    return collection.map(element => {

      const elementArray = inGroupsOfField[element];
      if (elementArray) {
        return elementArray[0];
      }
      return {};
    });
  }

  return {
    getUserById(userId) {
      return pgPool.query(`
        select * from users
        where id = $1
      `, [userId]).then(res => {
        return camelizeKeys(res.rows[0]);
      });
    },

    getUserByApiKey(apiKey) {
      return pgPool.query(`
        select * from users
        where api_key = $1
      `, [apiKey]).then(res => {
        return camelizeKeys(res.rows[0]);
      });
    },

    getContests(user) {
      return pgPool.query(`
        select * from contests
        where created_by = $1
      `, [user.id]).then( res => {
        return camelizeKeys(res.rows);
      });
    },

    getNames(contest) {
      return pgPool.query(`
        select * from names 
        where contest_id = $1
      `, [contest.id]).then( res => {
        return camelizeKeys(res.rows);
      });
    }

  };
};

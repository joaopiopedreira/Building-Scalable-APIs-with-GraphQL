const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');
const contestType = require('./contest');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: {type: GraphQLID},
    firstName : { type: GraphQLString },
    lastName : { type: GraphQLString },
    fullName : { 
      type: GraphQLString,
      resolve: (obj) => `${obj.firstName} ${obj.lastName}` 
    },
    createdAt : { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    contests: {
      type: new GraphQLList(contestType),
      resolve(obj, args, {pgPool}) {
        return pgdb(pgPool).getContests(obj);
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    },
    namesCount : {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    },
    votesCount : {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    }
  }
});
 

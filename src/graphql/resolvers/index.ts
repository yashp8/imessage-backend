import userResolvers from './user';
import merge from 'lodash.merge'
import conversationResolvers from "./conversation";

const resolvers = merge({}, userResolvers, conversationResolvers);

export default resolvers;
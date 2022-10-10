import { GraphQLContext } from 'src/util/types';

const resolvers = {
  // Query: {},
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: Array<string> },
      context: GraphQLContext,
    ) => {
      console.log('inside conv mutation', args);
    },
  },
};

export default resolvers;

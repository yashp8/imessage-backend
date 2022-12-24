import { CreateUsernameResponse, GraphQLContext } from '../../util/types';
import { GraphQLError } from 'graphql';
import { User } from '@prisma/client';

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      args: { username: string },
      context: GraphQLContext,
    ): Promise<Array<User>> => {
      const { username: searchUsername } = args;
      const { session, prisma } = context;
      if (!session?.user) {
        throw new GraphQLError('Not authorized');
      }

      const {
        user: { username: myUsername },
      } = session;

      try {
        return await prisma.user.findMany({
          where: {
            username: {
              contains: searchUsername,
              not: myUsername,
              mode: 'insensitive',
            },
          },
        });
        // return users;
      } catch (err: any) {
        throw new GraphQLError(err?.message);
      }
    },
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphQLContext,
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = context;
      if (!session?.user) {
        return {
          error: 'Not authorized',
        };
      }

      const { id: userId } = session.user;

      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (existingUser) {
          return {
            error: 'Username already taken',
          };
        }

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });

        return { success: true };
      } catch (error: any) {
        console.log('Create user error', error);
        return {
          error: error?.message,
        };
      }
    },
  },
};

export default resolvers;

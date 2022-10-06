import { CreateUsernameResponse, GraphQLContext } from "../../util/types";

const resolvers = {
    Query: {
        searchUsers: () => {
        }
    },
    Mutation: {
        createUsername: async (
            _: any,
            args: { username: string },
            context: GraphQLContext
        ): Promise<CreateUsernameResponse> => {
            const { username } = args;
            const { session, prisma } = context;
            if (!session?.user) {
                return {
                    error: 'Not authorized'
                };
            }

            const { id: userId } = session.user;

            try {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        username,
                    }
                });

                if (existingUser) {
                    return {
                        error: 'Username already taken'
                    }
                }

                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        username
                    }
                });

                return { success: true }

            } catch (error: any) {
                console.log('Create user error', error);
                return {
                    error: error?.message,
                }
            }

        }
    },
};

export default resolvers;
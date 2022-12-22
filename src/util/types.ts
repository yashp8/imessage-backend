import { ISODateString } from 'next-auth';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  conversationPopulated,
  participantPoppulated,
} from 'src/graphql/resolvers/conversation';
import { Context } from 'graphql-ws/lib/server';
import { PubSub } from 'graphql-subscriptions';

// import {Session} from "next-auth";

//server config

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}

export interface Session {
  user?: User;
  expires: ISODateString;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session | null;
  };
}

export interface User {
  id: string;
  username: string;
  image: string;
  email: string;
  emailVerified: boolean;
  name: string;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

//conversations

export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPoppulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPoppulated;
}>;

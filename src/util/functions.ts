import { ParticipantPoppulated } from './types';

export function userIsConversationParticipant(
  participant: Array<ParticipantPoppulated>,
  userId: string,
): boolean {
  return !!participant.find((participant) => participant.userId === userId);
}

import { generateSecretKey, getPublicKey, getEventHash, finalizeEvent } from 'nostr-tools';
import { pushWebSocketMessage } from './pushWebSocketMessage.ts';

interface Options {
  wsUrl?: string;
  save?: boolean;
}

export const createNostrEvent = async (options: Options = {}) => {
  const privateKey = generateSecretKey();
  const publicKey = getPublicKey(privateKey);
  const eventData = {
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [],
    content: 'Hello, Nostr!',
    pubkey: publicKey
  };

  const id = getEventHash(eventData);
  const event = {
    ...eventData,
    id: id,
    sig: finalizeEvent({ ...eventData, id }, privateKey).sig
  };

  try {
    if (options.wsUrl) {
      const wsMessage = JSON.stringify(["EVENT", event]);
      await pushWebSocketMessage(options.wsUrl, wsMessage);
      console.log('Event sent via WebSocket');
    }

    if (!options.wsUrl || options.save) {
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(event, null, 2));
      Deno.writeFileSync(`./export/${event.id}.json`, data);
      console.log('Event saved to filesystem');
    }

    return event;
  } catch (error) {
    throw new Error(`Failed to process event: ${error.message}`);
  }
};

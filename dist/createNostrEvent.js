"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNostrEvent = void 0;
const { generateSecretKey, getPublicKey, getEventHash, finalizeEvent, verifySignature } = require('nostr-tools');
const fs = require('fs');
const createNostrEvent = () => {
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
    const event = Object.assign(Object.assign({}, eventData), { id: id, sig: finalizeEvent(Object.assign(Object.assign({}, eventData), { id }), privateKey) });
    console.log('Private Key:', privateKey.toString('hex'));
    console.log('Public Key:', publicKey);
    console.log('Signed Event:', event);
    fs.writeFileSync(`./export/${event.id}.json`, JSON.stringify(event, null, 2));
    // const verified = verifySignature(event);
    // console.log('Event signature verified:', verified);
};
exports.createNostrEvent = createNostrEvent;

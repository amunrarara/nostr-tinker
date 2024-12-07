import { queryProfile as queryNip05 } from 'nostr-tools/nip05';

export const queryProfile = async (nip05: string) => {
    const profile = await queryNip05(nip05);
    console.log(profile);
};

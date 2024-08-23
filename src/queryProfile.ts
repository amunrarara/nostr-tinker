const { queryProfile: query } = require('nostr-tools/nip05');

export const queryProfile = async (nip05: string) => {
    let profile = await query(nip05)
    console.log(profile)
};

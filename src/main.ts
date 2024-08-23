import { createNostrEvent } from './createNostrEvent';
import { queryProfile } from './queryProfile';

const commands = [
    {
        long: '--event',
        short: '-e',
        description: 'Create a Nostr event'
    },
    {
        name: '--profile',
        alias: '-p',
        description: 'Query a Nostr profile'
    }
]

function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const options = args.slice(1);

    switch (command) {
        case '--event':
        case '-e':
            createNostrEvent();
            break;
        case '--profile':
        case '-p':
            queryProfile(options[0]);
            break;
        case '--help':
        case '-h':
            console.log('Available commands:');
            displayCommands();
            break;
        default:
            console.log('Invalid command. Use --help to see available commands.');
    }
}

const displayCommands = () => {
    commands.forEach(({ long, short, name, alias, description }) => {
        console.log(`${long || name}, ${short || alias}: ${description}`);
    });
}

main();

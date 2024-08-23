"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createNostrEvent_1 = require("./createNostrEvent");
const queryProfile_1 = require("./queryProfile");
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
];
function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const options = args.slice(1);
    switch (command) {
        case '--event':
        case '-e':
            (0, createNostrEvent_1.createNostrEvent)();
            break;
        case '--profile':
        case '-p':
            (0, queryProfile_1.queryProfile)(options[0]);
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
};
main();

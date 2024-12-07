import { parseArgs } from "jsr:@std/cli/parse-args";
import { createNostrEvent } from './src/createNostrEvent.ts';
import { queryProfile } from './src/queryProfile.ts';

const commands = [
    {
        name: 'event',
        alias: 'e',
        description: 'Create a Nostr event'
    },
    {
        name: 'profile',
        alias: 'p',
        description: 'Query a Nostr profile'
    },
    {
        name: 'ws',
        description: 'WebSocket URL for event transmission'
    },
    {
        name: 'save',
        description: 'Save event to filesystem when using WebSocket'
    }
];

function displayCommands() {
    commands.forEach(({ name, alias, description }) => {
        if (alias) {
            console.log(`--${name}, -${alias}: ${description}`);
        } else {
            console.log(`--${name}: ${description}`);
        }
    });
}

function main() {
    const flags = parseArgs(Deno.args, {
        string: ["profile", "ws"],
        boolean: ["help", "event", "save"],
        alias: {
            h: "help",
            e: "event",
            p: "profile"
        }
    });

    if (flags.help) {
        console.log('Available commands:');
        displayCommands();
        Deno.exit(0);
    }

    if (flags.event) {
        const options = {
            wsUrl: flags.ws,
            save: flags.save
        };
        createNostrEvent(options);
    } else if (flags.profile) {
        queryProfile(flags.profile);
    } else {
        console.log('Invalid command. Use --help to see available commands.');
        Deno.exit(1);
    }
}

if (import.meta.main) {
    main();
}

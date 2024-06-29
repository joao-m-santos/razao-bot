import { Events } from 'discord.js';

import type { DiscordClient } from '@root/index.types';

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: DiscordClient) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};

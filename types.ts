import type { Client, Collection } from 'discord.js';

export interface DiscordClient extends Client<true> {
  commands: Collection<string, any>;
}

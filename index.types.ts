import type { Client, Collection } from 'discord.js';

import type Database from '@lib/db';

export interface DiscordClient extends Client<true> {
  commands: Collection<string, any>;
  database: Database;
}

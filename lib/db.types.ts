import type { Snowflake } from 'discord.js';

export interface RazaoEntry {
  date: Date;
  recipient: Snowflake;
  loggedBy: Snowflake;
}

export interface CountAggregateDocument {
  _id: Snowflake;
  count: number;
}

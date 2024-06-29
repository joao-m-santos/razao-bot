import type { Snowflake } from 'discord.js';

export function getUserTopPercent(
  aggregate: { user: Snowflake; count: number }[],
  userId: Snowflake
) {
  const userIndex = aggregate
    .toSorted((a, b) => a.count - b.count)
    .findIndex(({ user }) => user === userId);
  if (userIndex === -1) return 1;
  return 1 - (userIndex + 1) / aggregate.length;
}

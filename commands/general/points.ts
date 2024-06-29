import {
  CommandInteraction,
  SlashCommandBuilder,
  type CacheType,
  type CommandInteractionOption,
  type Snowflake,
} from 'discord.js';

import { getUserTopPercent } from '@lib/util';

import type { DiscordClient } from '@root/index.types';

export default {
  data: new SlashCommandBuilder()
    .setName('points')
    .setDescription('Shows the points of razão a user has')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to show their points of razão')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const { user } = interaction.options.get('user') as CommandInteractionOption<CacheType>;

    if (user) {
      const db = (interaction.client as DiscordClient).database;
      const count = await db.getPoints(user.id as Snowflake);

      if (count !== null) {
        let replyString = `${user} has **${count}** points of razão!`;

        const pointAggregate = await db.getPointsByUser();

        if (pointAggregate) {
          const percentile = getUserTopPercent(pointAggregate, user.id);

          if (percentile === 0) {
            replyString += ` They are the user with **most** points of razão 👑`;
          } else if (percentile === 1) {
            replyString += ` They are among the users with **least** points of razão 💀`;
          } else {
            replyString += ` They are on the top ${Math.round(
              percentile * 100
            )}% of users with razão.`;
          }
        }

        await interaction.reply(replyString);
      } else {
        await interaction.reply(`Something went wrong! Check the bot logs.`);
      }
    } else {
      await interaction.reply('User not found!');
    }
  },
};

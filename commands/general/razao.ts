import { CommandInteraction, SlashCommandBuilder, type Snowflake } from 'discord.js';

import type { DiscordClient } from '@root/index.types';

export default {
  data: new SlashCommandBuilder()
    .setName('razao')
    .setDescription('Logs a point of razão')
    .addUserOption((option) =>
      option
        .setName('recipient')
        .setDescription('The user being awared with a point of razão')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const recipient = interaction.options.get('recipient');

    if (recipient) {
      const by = interaction.user;

      const success = await (interaction.client as DiscordClient).database.registerPoint(
        recipient.user?.id as Snowflake,
        by.id as Snowflake
      );

      if (success) {
        await interaction.reply(`A razão point was awarded to ✨ ${recipient.user} ✨, by ${by}!`);
      } else {
        await interaction.reply(`Something went wrong! Check the bot logs.`);
      }
    } else {
      await interaction.reply('User not found!');
    }
  },
};

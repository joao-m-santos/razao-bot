# razao-bot

A Discord bot to track who wins more arguments.

## Getting started

This project is built and ran by [Bun](https://bun.sh). Install it on your machine to develop and run `razao-bot`.

### Local dev

1. Clone the repo

   ```bash
   git clone git@github.com:joao-m-santos/razao-bot.git
   ```

2. Install dependencies

   ```bash
   bun install
   ```

3. Run bot
   ```bash
   bun run dev
   ```

### Production

1. Run bot for production
   ```bash
   bun run prod
   ```

Currently, the bot runs with the same commands for both dev and production. The only difference is that the `dev` command watches `index.ts`

module.exports = {
  apps: [
    {
      name: 'razao-bot',
      script: 'bun run prod',
      interpreter: 'none',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

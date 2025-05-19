module.exports = {
  apps : [{
    name: 'application',
    script: './node_modules/next/dist/bin/next',
    args: 'dev',
    exp_backoff_restart_delay: 100, // optional, adjust as needed
    watch: true, // optional, adjust as needed
    max_memory_restart: '400M' // optional, adjust as needed
  }]
};

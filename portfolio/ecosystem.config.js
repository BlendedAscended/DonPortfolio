// PM2 Ecosystem Config — DonPortfolio (sandeep.verbaflowllc.com)
// Deploy path: /var/www/portfolio
// Run: pm2 start ecosystem.config.js --only portfolio

module.exports = {
  apps: [
    {
      name: 'portfolio',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/portfolio/portfolio',

      // Port 3001 — Cloudflare Tunnel routes sandeep.verbaflowllc.com here
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },

      // Cluster mode
      instances: 2,
      exec_mode: 'cluster',

      // Auto-restart config
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      restart_delay: 3000,

      // Logging
      error_file: '/var/log/pm2/portfolio-error.log',
      out_file: '/var/log/pm2/portfolio-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Zero-downtime reload
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
    },
  ],
};

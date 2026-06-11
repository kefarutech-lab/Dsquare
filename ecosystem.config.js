module.exports = {
  apps: [
    {
      name: "dsquare-server",
      script: "./server/server.js",
      cwd: "/home/kefaru/dsquare",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
  ],
};

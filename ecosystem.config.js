module.exports = {
  apps: [
    {
      name: 'dev',
      script: 'yarn.js',
      args: 'dev',
      cwd: './',
      env: {
        NODE_ENV: 'development',
        HOST: '0.0.0.0',
      },
    },
    {
      name: 'build',
      script: 'yarn.js',
      cwd: './',
      args: 'dist',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'docs',
      script: 'vuepress',
      cwd: './docs/',
      args: 'serve',
    },
  ],
};

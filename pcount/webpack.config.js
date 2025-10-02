const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      mode: env.mode || 'development',
    },
    argv
  );

  config.devServer = {
    ...config.devServer,
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };

  return config;
};

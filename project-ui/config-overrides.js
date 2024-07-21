// config-overrides.js

module.exports = function override(config, env) {
    if (env === 'development') {
      config.devServer = {
        ...config.devServer,
        port: 3000, // Change this to your desired port
        allowedHosts: ['localhost']
      };
    }
    return config;
  };
  
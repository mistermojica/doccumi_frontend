module.exports = {
    apps : [{
      name: 'FRONTEND',
      script: 'server.js',
      //watch: '.'
      watch: ["build"],
      // Delay between restart
      watch_delay: 1000,
      ignore_watch : ["node_modules", "public"],
      watch_options: {
        "followSymlinks": false
      }
    }],
    deploy : {
      production : {
        'pre-deploy-local': '',
        'post-deploy': 'pm2 save',
        'pre-setup': ''
      }
    }
  };

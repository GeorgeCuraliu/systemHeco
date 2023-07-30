const path = require('path');

module.exports = {
  apps : [{
    name   : "server",
    script : path.join(__dirname, "server0.js"),
    error_file: path.join(__dirname, "err.log"),
    out_file: path.join(__dirname, "logs.log"),
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    shutdown_with_message: true,
    //instances : "max",   for production(will use all cpu cores -- around 100.000 users at same time) 
    //exec_mode : "cluster",
    
    env_production:{
      ENDPOINT: "anEndPoint",
      NUMBER: 2009
    }
  }]
}

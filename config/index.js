var configvalues = require('./config');

module.exports = {
    getDbConnectionString : function(){
        // return "mongodb://"+configvalues.uname+":"+configvalues.pwd+"@ds029224.mlab.com:29224/sample";
        //return "mongodb://localhost/sample";
        return configvalues;
    }
}
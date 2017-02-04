/**
 * Created by Kyle Walter on 1/26/2017.
 */
const env = process.env;

const config ={
    server: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || '0.0.0.0'
    },
    jwt:{
        secret:'supersecret',
        expiresIn:60 * 15
    },
    changeToken:{
        length:6,
        maxAge:60000 * 5
    },
    mongo:{
        url: 'mongodb://' + process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT + '/scoreitdb'
    },
    get serverUrl () {
        return `http://${this.server.host}:${this.server.port}`;
    }
};
export default config;
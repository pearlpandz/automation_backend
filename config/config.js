const config = {
    connectionLimit: 10,
    host: "localhost", // "iot.c3yfy0oqxffp.ap-south-1.rds.amazonaws.com", 
    port: 3306,
    user: 'root', // "root", 
    password: "Muthu@pand1", // "Muthu@pand1", 
    node_port: 8000,
    database: 'iot',
    secret: "youcanfindme",
}

const mqtt_options = {
    port: 1883,
    host: 'mqtt://165.22.208.52',
    username: 'quantanics',
    password: 'quantanics'
}

module.exports = {config, mqtt_options};
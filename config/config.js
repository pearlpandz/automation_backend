const config = {
    host: "localhost", // "165.22.208.52"
    port: 3306,
    user: 'quantanics', // "root", 
    password: "quantanics", 
    node_port: 8000,
    database: 'iot',
    secret: "youcanfindme",
    multipleStatements: true
}

const mqtt_options = {
    port: 1883,
    host: 'mqtt://165.22.208.52',
    username: 'quantanics',
    password: 'quantanics'
}

module.exports = { config, mqtt_options };
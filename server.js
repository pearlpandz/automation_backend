const express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    cors = require('cors'),
    config = require('./config/config'),
    bodyParser = require('body-parser'),
    path = require('path'),
    routes = require('./routes/index');

// NPM Packages use configuration
app.use(cors());

app.use(bodyParser.json());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));

app.use(bodyParser.json({ limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 500000 }));

// given full permission to access this folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(function (req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    next();
});
app.use(routes);


// server connection
try {
    server.listen(config.node_port, () => {
        console.log(`Server connected port with ${config.node_port}`)
    });
} catch (e) {
    console.log(e)
}
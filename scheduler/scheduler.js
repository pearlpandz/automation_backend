var cron = require('node-cron');
let mysql = require('mysql');
const config = require('../config/config');
const moment = require('moment');

let connection = mysql.createConnection(config);

var task = cron.schedule('* * * * *', () => {
  console.log('cron job ready');
  let sql = `SELECT * FROM iot.scheduler;`;
  connection.query(sql, true, (error, results, fields) => {
    if (error) {
      return res.status(400).send(error.message);
    }

    let all_devices = results.map(a => a.status ? a.deviceIds : '').toString().split(',').filter(a => a != null && a != "" && a != undefined);

    let devices = results.map(a => isElligible(a.starttime, a.endtime) && a.status ? a.deviceIds : '');

    let activeDevicesIds = devices.toString().split(',').filter(a => a != null && a != "" && a != undefined);
    let inActiveDevicesids = [];

    all_devices.forEach(device1 => {
      const index = activeDevicesIds.findIndex(a => a === device1);
      if (index == -1) {
        const index = inActiveDevicesids.findIndex(a => a === device1);
        if (index === -1) {
          inActiveDevicesids.push(device1);
        }
      }
    });

    let sql1 = `update iot.rooms_devices set status = 1 where id IN (${activeDevicesIds.toString()});`;
    let sql2 = `update iot.rooms_devices set status = 0 where id IN (${inActiveDevicesids.toString()});`;
    connection.query(sql1, true, (error1, results1, fields1) => {
      if (error1) {
        console.log(error1.message)
      }
      connection.query(sql2, true, (error2, results2, fields2) => {
        if (error1) {
          console.log(error2.message)
        }
        console.log('successfully updated!')
        console.log('watching...')
      });
    });
  });
}, {
  scheduled: false
});


exports.start = function (req, res) {
  console.log('cron job started...');
  task.start();
  console.log(task.getStatus())
}

exports.stop = function (req, res) {
  console.log('cron job stopped...');
  task.stop();
  console.log(task.getStatus())
}

exports.destroy = function (req, res) {

}

exports.list = function (req, res) {
  try {
    let sql = `SELECT * FROM iot.scheduler;`;
    connection.query(sql, true, (error, results, fields) => {
      if (error) {
        return res.status(400).send(error.message);
      }

      let all_devices = results.map(a => a.status ? a.deviceIds : '').toString().split(',').filter(a => a != null && a != "" && a != undefined);

      let devices = results.map(a => isElligible(a.starttime, a.endtime) && a.status ? a.deviceIds : '');

      let activeDevicesIds = devices.toString().split(',').filter(a => a != null && a != "" && a != undefined);
      let inActiveDevicesids = [];

      all_devices.forEach(device1 => {
        const index = activeDevicesIds.findIndex(a => a === device1);
        if (index == -1) {
          const index = inActiveDevicesids.findIndex(a => a === device1);
          if (index === -1) {
            inActiveDevicesids.push(device1);
          }
        }
      });

      let sql1 = `update iot.rooms_devices set status = 1 where id IN (${activeDevicesIds.toString()});`;
      let sql2 = `update iot.rooms_devices set status = 0 where id IN (${inActiveDevicesids.toString()});`;
      connection.query(sql1, true, (error1, results1, fields1) => {
        if (error1) {
          console.log(error1.message)
        }
        connection.query(sql2, true, (error2, results2, fields2) => {
          if (error1) {
            console.log(error2.message)
          }
          console.log('successfully updated!')
          console.log('watching...')
        });
      });
    });
  } catch (err) {
    return res.status(500).send(err.toString());
  }
}

function isElligible(starttime, endtime) {
  let date = moment(new Date()).format("MM-DD-YYYY");
  let start_time = moment(new Date(date + ' ' + starttime));
  let end_time = moment(new Date(date + ' ' + endtime));
  let current_time = moment(new Date());
  return start_time.isSameOrBefore(current_time) && end_time.isSameOrAfter(current_time);
}
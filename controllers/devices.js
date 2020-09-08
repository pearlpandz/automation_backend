// Modals
const DeviceSchema = require('../modals/device');

exports.list = function (req, res) {
    try {
        DeviceSchema.find({}, function (err, result) {
            if (err) {
                res.status(404).send({
                    success: false,
                    message: 'No users found'
                })
            } else {
                res.status(200).send({
                    success: true,
                    data: result
                })
            }
        })
    } catch (error) {
        return res.status(500).send(error.toString());
    }
}
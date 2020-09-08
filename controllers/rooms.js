// Modals
const RoomSchema = require('../modals/room');

exports.list = async (req, res) => {
    try {
        let pipeline = [
            {
                '$lookup': {
                    'from': 'devices',
                    'localField': 'devices.id',
                    'foreignField': '_id',
                    'as': 'deviceslist'
                }
            }, {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'boxId': 1,
                }
            }
        ]
        var promise = RoomSchema.aggregate(pipeline).exec();

        await promise.then((result) => {
            res.status(200).send({
                success: true,
                data: result
            })
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: 'No data found'
            })
        });

    } catch (error) {
        return res.status(500).send(error.toString());
    }
}

exports.listAll = async (req, res) => {
    try {
        let pipeline = [
            {
                '$lookup': {
                    'from': 'devices',
                    'localField': 'devices.refId',
                    'foreignField': '_id',
                    'as': 'deviceslist'
                }
            }, {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'boxId': 1,
                    'userId': 1,
                    'devices': {
                        '$map': {
                            'input': '$devices',
                            'as': 'ri',
                            'in': {
                                '$mergeObjects': [
                                    '$$ri', {
                                        '$arrayElemAt': [
                                            {
                                                '$filter': {
                                                    'input': '$deviceslist',
                                                    'cond': {
                                                        '$eq': [
                                                            '$$this._id', '$$ri.refId'
                                                        ]
                                                    }
                                                }
                                            }, 0
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        ]

        var promise = RoomSchema.aggregate(pipeline).exec();

        await promise.then((result) => {
            res.status(200).send({
                success: true,
                data: result
            })
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: 'No data found'
            })
        });

    } catch (error) {
        return res.status(500).send(error.toString());
    }
}

exports.singleGetRoom = async (req, res) => {
    try {
        let pipeline = [
            {
                '$match': {
                    'boxId': req.params.id
                }
            }, {
                '$lookup': {
                    'from': 'devices',
                    'localField': 'devices.refId',
                    'foreignField': '_id',
                    'as': 'deviceslist'
                }
            }, {
                '$project': {
                    '_id': 1,
                    'name': 1,
                    'boxId': 1,
                    'userId': 1,
                    'devices': {
                        '$map': {
                            'input': '$devices',
                            'as': 'ri',
                            'in': {
                                '$mergeObjects': [
                                    '$$ri', {
                                        '$arrayElemAt': [
                                            {
                                                '$filter': {
                                                    'input': '$deviceslist',
                                                    'cond': {
                                                        '$eq': [
                                                            '$$this._id', '$$ri.refId'
                                                        ]
                                                    }
                                                }
                                            }, 0
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        ]

        var promise = RoomSchema.aggregate(pipeline).exec();

        await promise.then((result) => {
            res.status(200).send({
                success: true,
                data: result
            })
        }).catch((err) => {
            res.status(404).send({
                success: false,
                message: 'No data found'
            })
        });

    } catch (error) {
        return res.status(500).send(error.toString());
    }
}

exports.updateRoom = async (req, res) => {
    try {
        RoomSchema.updateOne(
            { boxId: req.params.boxId, devices: { $elemMatch: { _id: req.params.id } } },
            {
                "$set": {
                    "devices.$": {
                        status: req.body.status, speed: req.body.speed
                    }
                },
            },
            function (err, result) {
                if (err) {
                    return res.status(404).send({
                        success: false,
                        message: 'User id is not match, Data not udpated',
                        err: err.toString()
                    })
                } else {
                    return res.status(200).send({
                        success: true,
                        data: result
                    })
                }
            });
    } catch (error) {

    }
}

exports.add = function (req, res) {
    try {
        let room = new RoomSchema({
            name: req.body.name,
            boxId: req.body.boxId,
            devices: req.body.devices,
            userId: req.decoded._id,
            createdAt: new Date()
        });
        room.save(function (err, result) {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'BoxId already exist',
                    error: err.toString()
                });
            } else {
                return res.status(200).send({
                    success: true,
                    data: result
                });
            }
        });
    } catch (error) {
        return res.status(500).send(error.toString());
    }
}



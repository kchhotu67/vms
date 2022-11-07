const VoucherBatch = require('../models/voucher_batch.model');

const voucher_batch_controller = {};
voucher_batch_controller.create = async (req, res, next) => {

    let newVoucherBatch = new VoucherBatch({offering_id: req.body.offering_id});
    newVoucherBatch.create( (err, data) => {
        if(err){
            res.status(400).send('something went wrong while insertng in voucher batch table')
        }else {
            req.body.batch_id = data.data.insertId;
            next();
        }
    })
}

module.exports = voucher_batch_controller;
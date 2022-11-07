const Voucher = require('../models/voucher.model');
const fs = require('fs')
const csv = require('fast-csv');

const voucher_controller = {};

function csvToDb(csvUrl, req, res){
  let stream = fs.createReadStream(csvUrl)
  let collectionCsv = []
  let length = 0;
  let csvFileStream = csv
    .parse()
    .on('data', function (data) {
        collectionCsv.push(data)
    })
    .on('end', function () {
        collectionCsv.shift()
        length = collectionCsv.length;
        collectionCsv.forEach(row => {
        const data = {
            name: row[0],
            created_at: row[1],
            updated_at: row[2],
            hash_key: row[3],
            code: row[4],
            created_by: req.body.created_by,
            modified_by: req.body.modified_by,
            batch_id: req.body.batch_id
        };
        let new_voucher = new Voucher(data);
        new_voucher.create( (err, data) => {
            if(err){
                console.log(err);
                res.status(400).send('something went wrong while insertng in voucher batch table')
            }
        })
    })
      fs.unlinkSync(csvUrl)
    })
    stream.pipe(csvFileStream)
}
voucher_controller.create = async (req, res) => {
    csvToDb(req.body.voucher_data, req, res);
    res.send(`data inserted successfully.`);
}

voucher_controller.delete = async ( req, res) => {
    let newVoucher = new Voucher({id: req.params.id});
    newVoucher.delete((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

voucher_controller.update = async ( req, res) => {
    let newVoucher = new Voucher({id: req.params.id});
    newVoucher.update(req.body, (err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

voucher_controller.getOne = async ( req, res) => {
    let newVoucher = new Voucher({id: req.params.id});
    newVoucher.getOne((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}
voucher_controller.getAll = async ( req, res) => {
    let newVoucher = new Voucher({});
    newVoucher.getAll((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}
voucher_controller.deleteBatch = async (req, res) => {
    let newVoucher = new Voucher({batch_id: req.params.id});
    newVoucher.deleteBatch((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

module.exports = voucher_controller;
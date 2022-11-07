const CollectionOffering = require('../models/collection_offer.model');

const collection_offering_controller = {};

collection_offering_controller.create = async (req, res) => {
    let newCollectionOffering = new CollectionOffering({collection_id: req.body.collection_id, offering_id: req.body.offering_id});
    newCollectionOffering.create((err, data) => {
        if(err){
            res.send('something went wrong');
            return;
        }
        return res.send(data);
    });
}

collection_offering_controller.delete = async ( req, res) => {
    let newCollectionOffering = new CollectionOffering({collection_id: req.params.id});
    newCollectionOffering.delete((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

collection_offering_controller.update = async ( req, res) => {
    let newCollectionOffering = new CollectionOffering({collection_id: req.params.id});
    newCollectionOffering.update(req.body, (err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

collection_offering_controller.getOne = async ( req, res) => {
    let newCollectionOffering = new CollectionOffering({collection_id: req.params.id});
    newCollectionOffering.getOne((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}
collection_offering_controller.getAll = async ( req, res) => {
    let newCollectionOffering = new CollectionOffering({});
    newCollectionOffering.getAll((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

module.exports = collection_offering_controller;
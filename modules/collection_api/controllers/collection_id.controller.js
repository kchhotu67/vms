const CollectionId = require('../models/collection_id.model');

const collection_id_controller = {};

collection_id_controller.create = async (req, res) => {
    let newCollectionId = new CollectionId({...req.body, created_at: new Date(), updated_at: new Date()});
    newCollectionId.create((err, data) => {
        if(err){
            res.send('something went wrong');
            return;
        }
        return res.send(data);
    });
}

collection_id_controller.delete = async ( req, res) => {
    let newCollectionId = new CollectionId({collection_id: req.params.id});
    newCollectionId.delete((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

collection_id_controller.update = async ( req, res) => {
    let newCollectionId = new CollectionId({collection_id: req.params.id});
    newCollectionId.update(req.body, (err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

collection_id_controller.getOne = async ( req, res) => {
    let newCollectionId = new CollectionId({collection_id: req.params.id});
    newCollectionId.getOne((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}
collection_id_controller.getAll = async ( req, res) => {
    let newCollectionId = new CollectionId({});
    newCollectionId.getAll((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

module.exports = collection_id_controller;
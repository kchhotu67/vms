const SourceBusiness = require("../models/source_business_model");
const { v4: uuidv4 } = require("uuid");
const source_business_controller = {};

source_business_controller.create = async ( req, res) => {
    let brand_id = uuidv4();
    let sourceBusiness = new SourceBusiness({...req.body, brand_id, created_at: new Date(), modified_at: new Date()});
    sourceBusiness.create((err, data) => {
        if(err){
            res.send('something went wrong');
            return;
        }
        return res.send(data);
    });
}

source_business_controller.delete = async ( req, res) => {
    let sourceBusiness = new SourceBusiness({brand_id: req.params.id});
    sourceBusiness.delete((err, data) => {
        if(err){
            res.send('something went wrong');
            return;
        }
        return res.send(data);
    });
}

source_business_controller.update = async ( req, res) => {
    let sourceBusiness = new SourceBusiness({brand_id: req.params.id});
    sourceBusiness.update(req.body, (err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

source_business_controller.getAll = async ( req, res) => {
    let sourceBusiness = new SourceBusiness({});
    sourceBusiness.getAll((err, data) => {
        if(err){
            res.send(err);
            return;
        }
        return res.send(data);
    });
}

source_business_controller.getOne = async (req, res) => {
    let sourceBusiness = new SourceBusiness({brand_id: req.params.id});
    sourceBusiness.getOne((err, data) => {
        if(err){
            res.send('something went wrong');
            return;
        }
        return res.send(data);
    });
}



module.exports = source_business_controller;
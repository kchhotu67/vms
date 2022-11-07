// let router = require("express").Router();

// let collection_offering_controller = require('../controllers/collection_offer.controller');

// router.post('/', collection_offering_controller.create);
// router.get('/', collection_offering_controller.getAll);
// router.get('/:id', collection_offering_controller.getOne);
// router.put('/:id', collection_offering_controller.update);
// router.delete('/:id', collection_offering_controller.delete);

// module.exports = router;


module.exports = app => {
    
    let collection_offering_controller = require('../controllers/collection_offer.controller');
        let router = require("express").Router();

        router.post('/', collection_offering_controller.create);
        router.get('/', collection_offering_controller.getAll);
        router.get('/:id', collection_offering_controller.getOne);
        router.put('/:id', collection_offering_controller.update);
        router.delete('/:id', collection_offering_controller.delete);
        app.use('/api/v1/collection_offering', router);
    }
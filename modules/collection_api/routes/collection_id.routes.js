// let router = require("express").Router();

// let collection_id_controller = require('../controllers/collection_id.controller');

// router.post('/', collection_id_controller.create);
// router.get('/', collection_id_controller.getAll);
// router.get('/:id', collection_id_controller.getOne);
// router.put('/:id', collection_id_controller.update);
// router.delete('/:id', collection_id_controller.delete);

// module.exports = router;

module.exports = app => {    
    let collection_id_controller = require('../controllers/collection_id.controller');
        let router = require("express").Router();

        router.post('/', collection_id_controller.create);
        router.get('/', collection_id_controller.getAll);
        router.get('/:id', collection_id_controller.getOne);
        router.put('/:id', collection_id_controller.update);
        router.delete('/:id', collection_id_controller.delete);
        app.use('/api/v1/collection_id', router);
    }
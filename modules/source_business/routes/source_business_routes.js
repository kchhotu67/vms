// const source_business_controller = require('../controllers/source_business_controller');
// const multipleUpload = require('../middlewares/upload_brand_image');
// let router = require("express").Router();

// router.post('/', multipleUpload, source_business_controller.create);
// router.get('/', source_business_controller.getAll);
// // router.get('/:id')
// router.put('/:id', source_business_controller.update);
// router.delete('/:id', source_business_controller.delete);

// module.exports = router;


module.exports = app => {
    const source_business_controller = require('../controllers/source_business_controller');
    const multipleUpload = require('../middlewares/upload_brand_image');
        let router = require("express").Router();

        router.post('/', multipleUpload, source_business_controller.create);
        router.get('/', source_business_controller.getAll);
        router.get('/:id', source_business_controller.getOne);
        router.put('/:id', source_business_controller.update);
        router.delete('/:id', source_business_controller.delete);
        app.use('/api/v1/source_business', router);
    }


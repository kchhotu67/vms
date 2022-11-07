// let router = require("express").Router();
// const multer = require("multer");
// const path = require("path")
// let voucher_controller = require('../controllers/voucher.controller');
// let voucher_batch_controller = require('../controllers/voucher_batch.controller');

// var storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//     callBack(null, path.resolve("csv_files"));
//   },
//   filename: (req, file, callBack) => {
//     callBack(
//       null,
//       file.fieldname + '-' + Date.now() + path.extname(file.originalname),
//     )
//   },
// })

// var upload = multer({
//   storage: storage,
// })

// router.post('/', upload.single('voucher_data'), async (req, res, next) => {
//     req.body.voucher_data = 'csv_files/'+req.file.filename;
//         next();
//     }, 
//     voucher_batch_controller.create, 
//     voucher_controller.create
// );

// router.get('/', voucher_controller.getAll);
// router.get('/:id', voucher_controller.getOne);
// router.put('/:id', voucher_controller.update);
// router.delete('/:id', voucher_controller.delete);
// router.delete('/delete_batch/:id', voucher_controller.deleteBatch);

// module.exports = router;



module.exports = app => {
        let router = require("express").Router();
        const multer = require("multer");
        const path = require("path")
        let voucher_controller = require('../controllers/voucher.controller');
        let voucher_batch_controller = require('../controllers/voucher_batch.controller');

        var storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, path.resolve("csv_files"));
        },
        filename: (req, file, callBack) => {
            callBack(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname),
            )
        },
        })

        var upload = multer({
        storage: storage,
        })

        router.post('/', upload.single('voucher_data'), async (req, res, next) => {
            req.body.voucher_data = 'csv_files/'+req.file.filename;
                next();
            }, 
            voucher_batch_controller.create, 
            voucher_controller.create
        );

        router.get('/', voucher_controller.getAll);
        router.get('/:id', voucher_controller.getOne);
        router.put('/:id', voucher_controller.update);
        router.delete('/:id', voucher_controller.delete);
        router.delete('/delete_batch/:id', voucher_controller.deleteBatch);
        app.use('/api/v1/voucher_batch', router);
    }

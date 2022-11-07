const multer =require("multer")
const path = require("path")

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.resolve("csv_files"));
	},
	filename: (req, file, cb) => {
		// console.log(file);
		let filename = `voucher-data-${Date.now()}.${file.originalname}`;
		cb(null, filename);
		if(file.fieldname == 'voucher_data'){
			req.body.csv_file_name = 'csv_files/'+filename;
		}
	},
});


const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb("Please upload only image.", false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

const multipleUpload = upload.fields([{name: 'brand_img1', maxCount:1}, {name: 'brand_img2', maxCount: 1}]);

module.exports = multipleUpload;
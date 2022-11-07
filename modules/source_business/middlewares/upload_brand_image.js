const multer =require("multer")
const path = require("path")

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.resolve("images/source_business/image"));
	},
	filename: (req, file, cb) => {
		// console.log(file);
		let filename = `brand_logo-${Date.now()}.${file.originalname}`;
		cb(null, filename);
		if(file.fieldname == 'brand_img1'){
			req.body.brand_img1 = 'images/source_business/image/'+filename;
		}
		if(file.fieldname == 'brand_img2'){
			req.body.brand_img2 = 'images/source_business/image/'+filename;
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
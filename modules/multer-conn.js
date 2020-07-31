const multer = require('multer');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const allowImgExt = ['jpg', 'png', 'jpeg', 'gif'];
const allowFileExt = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'hwp', 'pdf', 'txt', 'zip', 'jpg', 'png', 'jpeg', 'gif'];

/*
// fs.Promises 사용하기
const { promisify } = require('util');
const mkdir = promisify(fs.mkdir);
*/

// req, file: 사용자가 업로드한 파일, cb: 함수(err, folder명/file명)
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const result = makeFolder();
		result.err ? cb(err) : cb(null, result.folder);
	},
	filename: (req, file, cb) => {
		let ext = path.extname(file.originalname); // .jpg, .png ...
		let saveName = moment().format('YYMMDD') + '-' + uuidv4() + ext;
		cb(null, saveName);
	}
});
const upload = multer({ storage, limits: { fileSize: 2048000 }, fileFilter });

function makeFolder() {
	/*
	result : {err: null, folder: 'c:\..\..'} 폴더만들거나 존재할때
	result : {err: err, folder: 'c:\..\..'} 폴더만들기 실패
	*/
	const result = { err: null };
	let folder = path.join(__dirname, '../storage', moment().format('YYMMDD'));
	result.folder = folder;
	if(!fs.existsSync(folder)) {
		fs.mkdir(folder, (e) => {
			if(e) result.err = e;
			return result;
		});
	}
	return result;
}

function fileFilter(req, file, cb) {
	let ext = path.extname(file.originalname).toLowerCase().substr(1);
	if(allowImgExt.indexOf(ext) > -1) cb(null, true);
	else {
		req.banExt = ext;
		cb(null, false);
	}
}

module.exports = { upload };
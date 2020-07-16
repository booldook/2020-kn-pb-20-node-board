const http = {
	createServer(fn) {
		const req = {};
		const res = {};
		fn(req, res);
	}
};

module.exports = http;
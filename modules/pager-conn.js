const { pool, mysqlErr } = require('./mysql-conn');

module.exports = (req, localPath, tbName, where='WHERE 1') => {
	return new Promise(async (resolve, reject) => {
		let sql, connect, result, pager = {};
		try {
			sql = `SELECT COUNT(*) FROM ${tbName} ${where}`;
			connect = await pool.getConnection();
			result = await connect.execute(sql);
			connect.release();
			pager.path = localPath;
			pager.totalRec = result[0][0]['COUNT(*)'];
			pager.page = Number(req.params.page || 1); 
			pager.cnt = Number(req.query.cnt || 5);
			pager.grp = Number(req.query.grp || 3);
			pager.page = pager.page || 1;			// 현재페이지
			pager.cnt = pager.cnt || 5;				// 한페이지당 리스트 수
			pager.grp = pager.grp || 3;				// 페이저 그룹 갯수 예: 3 => (1,2,3/4,5,6)
			pager.stRec = (pager.page - 1) * pager.cnt;		// 페이지 리스트의 시작 Index 
			pager.lastPage = Math.ceil(pager.totalRec / pager.cnt);		// 마지막 페이지(총 페이지 수)
			pager.grpSt = Math.floor((pager.page - 1) / pager.grp) * pager.grp + 1;	// 페이저 묶음의 시작 수
			pager.grpEd = pager.grpSt + pager.grp - 1;		// 페이저 묶음의 마지막 수
			pager.grpEd = (pager.grpEd > pager.lastPage) ? pager.lastPage : pager.grpEd;
			pager.prev = (pager.page > 1) ? pager.page - 1 : 1;	// < 클릭하면 가는 페이지(이전 페이지)
			pager.next = (pager.page < pager.lastPage) ? pager.page + 1 : pager.lastPage; // > 클릭하면 가는 페이지(다음 페이지)
			resolve(pager);
		}
		catch(e) {
			reject(e);
		}
	});
}

